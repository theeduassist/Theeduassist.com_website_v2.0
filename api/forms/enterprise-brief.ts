import { Resend } from 'resend';

export const config = {
  // Use standard Node runtime instead of edge for broader compatibilities
  // runtime: 'edge',
};

export default async function handler(request: Request) {
  const isAjax = request.headers.get('Accept') === 'application/json' ||
                 request.headers.get('X-Requested-With') === 'XMLHttpRequest';

  const respond = (data: any, status: number) => {
    if (isAjax) {
      return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!data.success) {
       return Response.redirect(new URL('/enterprise-solutions/project-brief/?error=submission_failed', request.url), 303);
    }

    return Response.redirect(new URL('/enterprise-solutions/project-brief/thank-you/', request.url), 303);
  };

  try {
    if (request.method !== 'POST') {
       return respond({ success: false, message: "Method Not Allowed" }, 405);
    }

    const formData = await request.formData();

    const honeypot = formData.get('hp_field');
    if (honeypot) {
      return respond({ success: false, error: "Invalid submission." }, 400);
    }

    const requiredFields = ['fullName', 'email', 'organization', 'role'];
    const errors: Record<string, string> = {};

    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || typeof value !== 'string' || value.trim() === '') {
        errors[field] = `${field} is required.`;
      }
    }

    const email = formData.get('email');
    if (typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       errors['email'] = "Valid email is required.";
    }

    if (Object.keys(errors).length > 0) {
      return respond({
         success: false,
         errors,
         message: "Please correct the highlighted fields."
      }, 400);
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
        const turnstileResponse = formData.get('cf-turnstile-response');
        if (!turnstileResponse) {
             return respond({
                 success: false,
                 message: "Security check failed. Please refresh and try again."
             }, 400);
        }

        const ip = request.headers.get('CF-Connecting-IP') || '';

        const verificationFormData = new FormData();
        verificationFormData.append('secret', turnstileSecret);
        verificationFormData.append('response', turnstileResponse as string);
        if (ip) {
            verificationFormData.append('remoteip', ip);
        }

        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const result = await fetch(url, {
            body: verificationFormData,
            method: 'POST',
        });

        const outcome = await result.json();
        if (!outcome.success) {
            return respond({
                success: false,
                message: "Security validation failed. Please try again."
            }, 400);
        }
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@theeduassist.com';
    const toEmail = process.env.RESEND_TO_EMAIL || 'info@theeduassist.com';

    if (!resendApiKey) {
        return respond({
            success: false,
            message: "Submission failed: email delivery provider is not configured in this environment."
        }, 501);
    }

    const resend = new Resend(resendApiKey);

    const safeHtml = `
      <h2>New Enterprise Project Brief</h2>
      <p><strong>Name:</strong> ${String(formData.get('fullName')).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <p><strong>Email:</strong> ${String(formData.get('email')).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <p><strong>Organization:</strong> ${String(formData.get('organization')).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <p><strong>Role:</strong> ${String(formData.get('role')).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    `;

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: `TheEduAssist <${fromEmail}>`,
      to: [toEmail],
      subject: 'New Enterprise Project Brief',
      html: safeHtml,
    });

    if (resendError) {
      console.error("Resend delivery error:", resendError);
      return respond({
          success: false,
          message: "An error occurred while delivering your message. Please try again later."
      }, 500);
    }

    return respond({ success: true, message: "Submission successful." }, 200);

  } catch (error) {
    console.error("Form submission error:", error);
    return respond({
        success: false,
        message: "An unexpected error occurred. Please try again later."
    }, 500);
  }
}
