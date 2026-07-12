import { getLiveServices } from "./serviceArchitecture";

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

// Generate groups from the service architecture
const createDesignGroup: NavigationGroup = {
    id: "create-design",
    label: "CREATE & DESIGN",
    links: [
        { id: "all-services", label: "All Services", href: "/services/", icon: "LayoutGrid" },
        ...getLiveServices().filter(s => s.family === "strategy-design" || s.family === "development-content").map(s => ({
            id: s.id,
            label: s.title,
            href: s.slug,
            icon: s.icon
        }))
    ]
};

const platformsTechGroup: NavigationGroup = {
    id: "platforms-tech",
    label: "PLATFORMS & TECHNOLOGY",
    links: [
        ...getLiveServices().filter(s => s.family === "technology-platforms").map(s => ({
            id: s.id,
            label: s.title,
            href: s.slug,
            icon: s.icon
        }))
    ]
};

const modernizeSupportGroup: NavigationGroup = {
    id: "quality-ai-support",
    label: "QUALITY & SUPPORT",
    links: getLiveServices().filter(s => s.family === "quality-ai-support").map(s => ({
        id: s.id,
        label: s.title,
        href: s.slug,
        icon: s.icon
    }))
};

export const siteNavigation: TopLevelNavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    type: "link",
    enabled: true
  },
  {
    id: "services",
    label: "Services",
    type: "mega-menu",
    enabled: true,
    groups: [
      platformsTechGroup,
      modernizeSupportGroup,
      createDesignGroup
    ].filter(g => g.links.length > 0)
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
    id: "about",
    label: "About Us",
    type: "dropdown",
    enabled: true,
    groups: [
      {
        id: "about-company",
        label: "Company",
        links: [
          { id: "about-us", label: "About Us", href: "/about-us/", icon: "Users" },
          { id: "blog", label: "Blog", href: "/blog/", icon: "BookOpen" },
          { id: "platforms", label: "Supported Platforms", href: "/platforms/", icon: "Database" },
        ]
      }
    ]
  }
];

export const footerNavigation = {
  services: [
    { label: "All Services", href: "/services/" },
    ...getLiveServices().map(s => ({ label: s.title, href: s.slug })),
  ],
  kajabi: [
      { label: "Kajabi Services", href: "/kajabi-services/" }
  ],
  resources: [
      { label: "Blog", href: "/blog/" },
      { label: "Case Studies", href: "/case-studies/" },
      { label: "Platforms", href: "/platforms/" }
  ],
  company: [
    { label: "About Us", href: "/about-us/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Contact", href: "/contact/" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms and Conditions", href: "/terms-and-conditions/" },
    { label: "Accessibility", href: "/accessibility-statement/" },
    { label: "Cookie Policy", href: "/cookie-policy/" }
  ],
  locations: [
     { label: "London", href: "/locations/europe/united-kingdom/london/" },
     { label: "Dubai", href: "/locations/middle-east/uae/dubai/" },
     { label: "Toronto", href: "/locations/north-america/canada/toronto/" }
  ]
};
