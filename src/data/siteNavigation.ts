export type NavigationLink = {
  id: string;
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
  enabled?: boolean;
};

export type NavigationGroup = {
  id: string;
  label: string;
  links: NavigationLink[];
};

export type TopLevelNavigationItem = {
  id: string;
  label: string;
  href?: string;
  type: "link" | "dropdown" | "mega-menu";
  groups?: NavigationGroup[];
  enabled?: boolean;
};

export const siteNavigation: TopLevelNavigationItem[] = [
  {
    id: "services",
    label: "Services",
    type: "mega-menu",
    enabled: true,
    groups: [
      {
        id: "create-design",
        label: "CREATE & DESIGN",
        links: [
          { id: "all-services", label: "All Services", href: "/services/", icon: "LayoutGrid" },
          { id: "custom-elearning", label: "Custom eLearning Development", href: "/services/custom-elearning-development/", icon: "PenTool" }
        ]
      },
      {
        id: "platforms-tech",
        label: "PLATFORMS & TECHNOLOGY",
        links: [
          { id: "lms-implementation", label: "LMS Implementation & Migration", href: "/services/lms-implementation-migration/", icon: "Database" },
          { id: "ai-powered", label: "AI-Powered eLearning", href: "/services/ai-powered-elearning/", icon: "Cpu" }
        ]
      },
      {
        id: "modernize-support",
        label: "MODERNIZE & SUPPORT",
        links: [
          { id: "content-conversion", label: "Content Conversion", href: "/services/content-conversion/", icon: "RefreshCw" },
          { id: "funnels-automation", label: "Funnels & Automation", href: "/services/funnels-automation/", icon: "Workflow" },
          { id: "ongoing-support", label: "Ongoing Support & Maintenance", href: "/services/ongoing-support-maintenance/", icon: "LifeBuoy" }
        ]
      }
    ]
  },
  {
    id: "kajabi",
    label: "Kajabi Services",
    href: "/kajabi-services/",
    type: "link",
    enabled: true
  },
  {
    id: "case-studies",
    label: "Case Studies",
    href: "/case-studies/",
    type: "link",
    enabled: true
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing/",
    type: "link",
    enabled: true
  },
  {
    id: "insights",
    label: "Insights",
    href: "/blog/",
    type: "link",
    enabled: true
  },
  {
    id: "about-us",
    label: "About Us",
    type: "dropdown",
    href: "/about-us/",
    enabled: true,
    groups: [
      {
        id: "company",
        label: "Company",
        links: [
          { id: "about", label: "About TheEduAssist", href: "/about-us/" },
          { id: "contact", label: "Contact Us", href: "/contact/" },
          { id: "careers", label: "Careers", href: "/careers/" }
        ]
      }
    ]
  }
];

export const footerNavigation = {
  services: [
    { label: 'All Services', href: '/services/' },
    { label: 'Custom eLearning Development', href: '/services/custom-elearning-development/' },
    { label: 'LMS Implementation & Migration', href: '/services/lms-implementation-migration/' },
    { label: 'AI-Powered eLearning', href: '/services/ai-powered-elearning/' },
    { label: 'Content Conversion', href: '/services/content-conversion/' },
    { label: 'Ongoing Support', href: '/services/ongoing-support-maintenance/' }
  ],
  kajabi: [
    { label: 'Kajabi Services', href: '/kajabi-services/' }
  ],
  resources: [
    { label: 'Insights', href: '/blog/' },
    { label: 'Case Studies', href: '/case-studies/' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Platforms', href: '/platforms/' },
    { label: 'Sitemap', href: '/sitemap/' }
  ],
  company: [
    { label: 'About TheEduAssist', href: '/about-us/' },
    { label: 'Contact Us', href: '/contact/' },
    { label: 'Careers', href: '/careers/' }
  ],
  trustLegal: [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
    { label: 'Editorial Policy', href: '/editorial-policy/' },
    { label: 'AI Use Policy', href: '/ai-use-policy/' },
    { label: 'Accessibility Statement', href: '/accessibility-statement/' }
  ]
};