import { buildCanonicalUrl } from '../seo';
import { organizationEntity } from '../../data/organizationEntity';

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${organizationEntity.url}/#organization`,
    "name": organizationEntity.name,
    "legalName": organizationEntity.legalName,
    "alternateName": organizationEntity.alternateName,
    "description": organizationEntity.description,
    "url": organizationEntity.url,
    "logo": {
      "@type": "ImageObject",
      "@id": `${organizationEntity.url}/#logo`,
      "url": organizationEntity.logo,
      "caption": organizationEntity.name
    },
    "image": `${organizationEntity.url}/og/theeduassist-og-image.png`,
    "email": organizationEntity.contactPoint.email,
    "sameAs": organizationEntity.socialProfiles,
    "knowsAbout": [
      "Custom eLearning Development",
      "Instructional Design and Curriculum Architecture",
      "Section 508 Accessibility Compliance",
      "WCAG 2.1 AA Digital Standards",
      "SCORM 1.2 and SCORM 2004 4th Edition",
      "xAPI and Experience API Interoperability",
      "cmi5 Standard",
      "Learning Management Systems Implementation and Migration",
      "Kajabi Platform Architecture and Optimization",
      "Kirkpatrick Training Evaluation Model (Levels 1-4)",
      "ADDIE Instructional Design Framework",
      "Cathy Moore Action Mapping",
      "Government and Public Sector Training Solutions",
      "Corporate Workforce Upskilling",
      "Content Conversion and Flash to HTML5 Modernization",
      "AI in Education and Microlearning"
    ],
    "areaServed": [
      "Worldwide",
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "United Arab Emirates"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK",
      "addressLocality": "Global Remote Delivery Center",
      "description": "Borderless Global Remote Learning Studio with core delivery operations in Pakistan."
    },
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
    "@id": `${organizationEntity.url}/#website`,
    "name": organizationEntity.name,
    "alternateName": organizationEntity.alternateName,
    "url": organizationEntity.url,
    "description": organizationEntity.description,
    "publisher": {
      "@id": `${organizationEntity.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${organizationEntity.url}/blog/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${organizationEntity.url}/#service`,
    "name": organizationEntity.name,
    "url": organizationEntity.url,
    "parentOrganization": {
      "@id": `${organizationEntity.url}/#organization`
    },
    "description": organizationEntity.description,
    "image": `${organizationEntity.url}/favicon-512x512.png`,
    "email": organizationEntity.contactPoint.email,
    "priceRange": "$$$",
    "areaServed": "Worldwide",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "48",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "E-Learning & Course Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom eLearning Development",
            "url": `${organizationEntity.url}/services/custom-elearning-development/`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government & Public Sector Training Solutions",
            "url": `${organizationEntity.url}/enterprise-solutions/government-and-public-sector-training/`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kajabi Course and Website Systems",
            "url": `${organizationEntity.url}/kajabi-services/`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LMS Implementation and Migration",
            "url": `${organizationEntity.url}/services/lms-implementation-migration/`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instructional Design and Course Planning",
            "url": `${organizationEntity.url}/services/instructional-design/`
          }
        }
      ]
    }
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
      "@id": `${organizationEntity.url}/#organization`,
      "name": organizationEntity.name,
      "url": organizationEntity.url
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

export function governmentServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": "Government & Public Sector Digital Training Development",
    "serviceType": "Public Sector Custom eLearning & Accessibility Compliance",
    "provider": {
      "@type": "Organization",
      "@id": `${organizationEntity.url}/#organization`,
      "name": organizationEntity.name,
      "url": organizationEntity.url
    },
    "description": "Section 508 and WCAG 2.1 AA-compliant custom eLearning, workforce upskilling, and regulatory compliance training development for federal, state, and municipal public sector agencies.",
    "areaServed": [
      "United States",
      "United Kingdom",
      "Australia",
      "Canada",
      "Worldwide"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Public Sector Learning Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Section 508 & WCAG 2.1 AA eLearning Remediation",
            "description": "Auditing and engineering digital learning assets to meet federal accessibility mandates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Public Workforce Compliance Training",
            "description": "Scenario-based ethics, regulatory, and technical workforce training for public sector personnel."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SCORM & xAPI Interoperable Learning Packages",
            "description": "Multi-agency SCORM 2004 4th Edition and xAPI module builds with auditable completion tracking."
          }
        }
      ]
    },
    "url": `${organizationEntity.url}/enterprise-solutions/government-and-public-sector-training/`
  };
}

export function higherEducationServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Higher Education & University Digital Learning Architecture",
    "serviceType": "University Course Development & LMS Engineering",
    "provider": {
      "@type": "Organization",
      "@id": `${organizationEntity.url}/#organization`,
      "name": organizationEntity.name,
      "url": organizationEntity.url
    },
    "description": "Specialized instructional design, Canvas/Blackboard LMS development, Quality Matters (QM) rubric alignment, and syllabus-to-online master course conversion for universities and higher education institutions.",
    "areaServed": [
      "United States",
      "United Kingdom",
      "Australia",
      "Singapore",
      "Malaysia",
      "Canada",
      "Worldwide"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Higher Education Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Canvas & Blackboard Master Course Development",
            "description": "Structured academic course shell engineering with rubrics, modular progression, and gradebook integration."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Faculty Syllabus-to-Online Course Conversion",
            "description": "Transforming academic professor syllabi and lecture slides into engaging, accessible asynchronous digital modules."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quality Matters & Section 508 Accessibility Audit",
            "description": "Academic quality assurance, QM standard mapping, and WCAG 2.2 AA digital accessibility compliance."
          }
        }
      ]
    },
    "url": `${organizationEntity.url}/enterprise-solutions/higher-education-and-universities/`
  };
}

export function gccEnterpriseTrainingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Middle East & GCC Corporate Training Solutions",
    "serviceType": "Enterprise Industrial Training & Bilingual Arabic/English L&D",
    "provider": {
      "@type": "Organization",
      "@id": `${organizationEntity.url}/#organization`,
      "name": organizationEntity.name,
      "url": organizationEntity.url
    },
    "description": "Bilingual (Arabic/English) custom eLearning, OSHA/NEBOSH HSE safety training, and technical workforce upskilling aligned with Saudi Vision 2030 and GCC industrial contractor requirements.",
    "areaServed": [
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Oman",
      "Bahrain",
      "Worldwide"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "GCC Corporate Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "HSE & Industrial Safety Interactive Courseware",
            "description": "High-impact microlearning modules for site safety, hazard identification, and OSHA compliance in English, Arabic, and Urdu."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bilingual Arabic & English RTL Course Engineering",
            "description": "Native Right-to-Left (RTL) Articulate Storyline authoring with authentic cultural localization and bilingual voiceover."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Saudi Vision 2030 Workforce Upskilling Architecture",
            "description": "Saudization training pipelines converting complex engineering SOPs into measurable digital academies."
          }
        }
      ]
    },
    "url": `${organizationEntity.url}/enterprise-solutions/middle-east-corporate-training/`
  };
}

