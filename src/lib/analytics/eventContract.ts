export const ENTERPRISE_CTA_CLICK = "enterprise_cta_click";
export const ENTERPRISE_FORM_ERROR = "enterprise_form_error";
export const GENERATE_LEAD = "generate_lead";

export interface EnterpriseCtaClickPayload {
  cta_name: string;
  cta_location: string;
  destination_type: string;
  page_type: string;
}

export interface EnterpriseFormErrorPayload {
  form_id: string;
  error_type: string;
  field_category: string;
  page_type: string;
}

export interface GenerateLeadPayload {
  form_id: string;
  lead_type: string;
  page_type: string;
  project_type: string;
  audience_category: string;
  platform_category: string;
  budget_range: string;
  procurement_required: string;
}

export function trackEnterpriseCtaClick(payload: EnterpriseCtaClickPayload) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: ENTERPRISE_CTA_CLICK, ...payload });
  }
}

export function trackEnterpriseFormError(payload: EnterpriseFormErrorPayload) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: ENTERPRISE_FORM_ERROR, ...payload });
  }
}

export function trackGenerateLead(payload: GenerateLeadPayload) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: GENERATE_LEAD, ...payload });
  }
}
