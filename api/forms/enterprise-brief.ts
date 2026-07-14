export const config = {
  runtime: 'edge',
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

    // Progressive enhancement: redirect with a generic error query string
    // if not AJAX. Never expose JSON to standard form submitters.
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

    // Honeypot check
    const honeypot = formData.get('hp_field');
    if (honeypot) {
      return respond({ success: false, error: "Invalid submission." }, 400);
    }

    // Server-side validation logic
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

    // Turnstile validation if secret key is present
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

    // Do not fake successful submission.
    // Delivery provider is not configured.
    return respond({
        success: false,
        message: "Submission failed: email delivery provider is not configured in this environment."
    }, 501);

  } catch (error) {
    console.error("Form submission error:", error);
    return respond({
        success: false,
        message: "An unexpected error occurred. Please try again later."
    }, 500);
  }
}
