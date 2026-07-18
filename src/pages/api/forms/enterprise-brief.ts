export const prerender = false;
import type { APIRoute } from 'astro';

const MAX_BODY_SIZE = 64 * 1024; // 64 KB limit

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    // Basic request size check if header is present
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return handleRejection(request, redirect, 'payload_too_large', 413, 'Request body is too large.');
    }

    // Read form data
    const formData = await request.formData().catch(() => null);

    if (!formData) {
      return handleRejection(request, redirect, 'invalid_form_data', 400, 'Invalid form data.');
    }

    // Check honeypot
    const hp = formData.get('website_url');
    if (hp) {
      // Return success to the bot to silently drop them
      return handleRejection(request, redirect, 'bot_rejected', 200, 'Submission successful.');
    }

    // Validate turnstile token
    const token = formData.get('cf-turnstile-response');
    if (!token) {
       return handleRejection(request, redirect, 'missing_turnstile', 400, 'Security token is missing.');
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY || import.meta.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      // Fail closed when missing secret
      console.error('Turnstile secret missing. Failing closed.');
      return handleRejection(request, redirect, 'configuration_error', 503, 'Service configuration unavailable. Please try again later.');
    }

    const turnstileData = new FormData();
    turnstileData.append('secret', turnstileSecret);
    turnstileData.append('response', token as string);

    // Verify token with Cloudflare
    try {
      const tsResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: turnstileData,
      });
      const tsOutcome = await tsResult.json();
      if (!tsOutcome.success) {
        return handleRejection(request, redirect, 'invalid_turnstile', 400, 'Security verification failed.');
      }
    } catch (e) {
      return handleRejection(request, redirect, 'verification_error', 500, 'Error communicating with verification service.');
    }

    // Extract fields
    const payload = {
      fullName: (formData.get('fullName') as string || '').slice(0, 100).trim(),
      email: (formData.get('email') as string || '').slice(0, 254).trim().toLowerCase(),
      organization: (formData.get('organization') as string || '').slice(0, 160).trim(),
      role: (formData.get('role') as string || '').slice(0, 120).trim(),
      projectType: (formData.get('projectType') as string || '').slice(0, 100),
      audience: (formData.get('audience') as string || '').slice(0, 100),
      contentStatus: (formData.get('contentStatus') as string || '').slice(0, 100),
      platform: (formData.get('platform') as string || '').slice(0, 100),
      scope: (formData.get('scope') as string || '').slice(0, 100),
      timing: (formData.get('timing') as string || '').slice(0, 100),
      objective: (formData.get('objective') as string || '').slice(0, 1500).trim(),
      description: (formData.get('description') as string || '').slice(0, 5000).trim(),
      website: (formData.get('website') as string || '').slice(0, 300).trim(),
      country: (formData.get('country') as string || '').slice(0, 120).trim(),
      privacyPolicy: formData.get('privacyPolicy') === 'true',
      marketingOptIn: formData.get('marketingOptIn') === 'true'
    };

    // Basic server validation
    if (!payload.fullName || !payload.email || !payload.organization || !payload.role || !payload.objective || !payload.description || !payload.privacyPolicy) {
      return handleRejection(request, redirect, 'missing_fields', 400, 'Please fill out all required fields and accept the privacy policy.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return handleRejection(request, redirect, 'invalid_email', 400, 'Please provide a valid email address.');
    }

    // Delivery logic
    // We fail closed if no delivery webhook or provider is configured to avoid fake success.
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
       console.error('No delivery provider configured. Failing closed.');
       return handleRejection(request, redirect, 'delivery_not_configured', 501, 'Submission system is currently unavailable. Please contact us directly.');
    }

    try {
      const deliveryRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'enterprise_brief', data: payload })
      });
      if (!deliveryRes.ok) {
         console.error('Webhook delivery failed');
         return handleRejection(request, redirect, 'delivery_error', 500, 'Failed to deliver message. Please try again later.');
      }
    } catch (err) {
       console.error('Webhook delivery exception:', err);
       return handleRejection(request, redirect, 'delivery_error', 500, 'Failed to deliver message. Please try again later.');
    }

    // Success Response
    if (request.headers.get('accept')?.includes('application/json')) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return redirect('/enterprise-solutions/project-brief/thank-you/', 303);

  } catch (err) {
    console.error('Form processing error:', err);
    return handleRejection(request, redirect, 'server_error', 500, 'An internal error occurred. Please try again.');
  }
};

export const GET: APIRoute = ({ request }) => {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
};
export const PUT = GET;
export const PATCH = GET;
export const DELETE = GET;

function handleRejection(request: Request, redirect: any, errorCode: string, statusCode: number, message: string) {
  if (request.headers.get('accept')?.includes('application/json')) {
    return new Response(JSON.stringify({ error: message, code: errorCode }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return redirect(`/enterprise-solutions/project-brief/?form=error&code=${errorCode}`, 303);
}
