import { site, buildCanonicalUrl } from '../seo';
import { organizationEntity } from '../../data/organizationEntity';

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationEntity.name,
    "alternateName": organizationEntity.alternateName,
    "description": organizationEntity.description,
    "url": organizationEntity.url,
    "logo": organizationEntity.logo,
    "image": `${organizationEntity.url}/og/theeduassist-og-image.png`,
    "email": organizationEntity.contactPoint.email,
    "sameAs": organizationEntity.socialProfiles,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": organizationEntity.contactPoint.email,
      "contactType": "customer service"
    }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": organizationEntity.name,
    "alternateName": organizationEntity.alternateName,
    "url": organizationEntity.url,
    "description": organizationEntity.description
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": organizationEntity.name,
    "url": organizationEntity.url,
    "description": organizationEntity.description,
    "image": `${organizationEntity.url}/favicon-512x512.png`,
    "email": organizationEntity.contactPoint.email
  };
}

export function serviceSchema(name: string, description: string, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": organizationEntity.name
    },
    "url": buildCanonicalUrl(urlPath)
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;

  const validFaqs = faqs.filter(faq => faq.question && faq.answer);
  if (validFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        // Simple strip of unsafe HTML, allowing basic text to pass.
        "text": typeof faq.answer === 'string' ? faq.answer.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '').replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '') : 'Answer available on site.'
      }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; urlPath: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": buildCanonicalUrl(item.urlPath)
    }))
  };
}

export function webPageSchema(name: string, description: string, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": buildCanonicalUrl(urlPath)
  };
}

export function collectionPageSchema(name: string, description: string, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": buildCanonicalUrl(urlPath)
  };
}
