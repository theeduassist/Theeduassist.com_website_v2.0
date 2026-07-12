export type ServiceStatus =
  | "live"
  | "planned-part-2"
  | "planned-part-3"
  | "planned-part-4"
  | "internal"
  | "retired";

export type ServiceFamily =
  | "strategy-design"
  | "development-content"
  | "technology-platforms"
  | "quality-ai-support"
  | "global-learning";

export interface ServiceDefinition {
  id: string;
  title: string;
  shortTitle?: string;
  slug: string; // The URL path
  family: ServiceFamily;
  shortDescription: string;
  problemSolved: string;
  audience: string[];
  icon: string; // Lucide icon name
  status: ServiceStatus;
  publicVisibility: boolean;
  navigationVisibility: boolean;
  hubVisibility: boolean;
  relatedServices?: string[]; // IDs of related services
  relatedCaseStudies?: string[]; // Slugs of case studies
  ctaType: "review" | "contact" | "kajabi-review";
}

export const serviceArchitecture: ServiceDefinition[] = [
  // A. STRATEGY AND DESIGN
  {
    id: "learning-strategy",
    title: "Learning Strategy & Course Planning",
    slug: "/services/learning-strategy/",
    family: "strategy-design",
    shortDescription: "Define your audience, curriculum, and delivery model before building.",
    problemSolved: "Our knowledge is not organized.",
    audience: ["Organizations", "Creators"],
    icon: "Map",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "review"
  },
  {
    id: "instructional-design",
    title: "Instructional Design Services",
    slug: "/services/instructional-design/",
    family: "strategy-design",
    shortDescription: "Structure content for effective learning and engagement.",
    problemSolved: "We need to structure our learning material.",
    audience: ["Organizations", "Creators"],
    icon: "PenTool",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },
  {
    id: "course-development",
    title: "Course and Curriculum Development",
    slug: "/services/course-development/",
    family: "strategy-design",
    shortDescription: "Build comprehensive learning paths and courses.",
    problemSolved: "We need to build a new online course.",
    audience: ["Organizations", "Creators"],
    icon: "BookOpen",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },
  {
    id: "assessment-design",
    title: "Assessment and Learning Activity Design",
    slug: "/services/assessment-design/",
    family: "strategy-design",
    shortDescription: "Create meaningful tests and practice exercises.",
    problemSolved: "We need to measure learning progress.",
    audience: ["Organizations", "Creators"],
    icon: "CheckSquare",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },

  // B. DEVELOPMENT AND CONTENT
  {
    id: "custom-elearning",
    title: "Custom eLearning Development",
    slug: "/services/custom-elearning-development/",
    family: "development-content",
    shortDescription: "Create engaging, tailor-made eLearning courses designed around your goals, content, and learners' needs.",
    problemSolved: "We need custom interactive eLearning.",
    audience: ["Organizations", "Creators"],
    icon: "MonitorPlay",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },
  {
    id: "content-conversion",
    title: "Content Conversion and Modernization",
    slug: "/services/content-conversion/",
    family: "development-content",
    shortDescription: "Modernize old materials, PDFs, and presentations into digital learning content.",
    problemSolved: "We need to convert books, slides, PDFs or videos.",
    audience: ["Organizations", "Creators"],
    icon: "RefreshCw",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "review"
  },
  {
    id: "microlearning",
    title: "Microlearning",
    slug: "/services/microlearning/",
    family: "development-content",
    shortDescription: "Deliver focused lessons through bite-sized modules.",
    problemSolved: "We need fast, accessible training.",
    audience: ["Organizations", "Creators"],
    icon: "Zap",
    status: "planned-part-2",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "review"
  },
  {
    id: "scenario-learning",
    title: "Scenario-Based Learning",
    slug: "/services/scenario-learning/",
    family: "development-content",
    shortDescription: "Practice-based scenarios through realistic simulations.",
    problemSolved: "We need realistic practice environments.",
    audience: ["Organizations"],
    icon: "Users",
    status: "planned-part-2",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "review"
  },
  {
    id: "video-multimedia",
    title: "Video and Multimedia Learning",
    slug: "/services/video-multimedia/",
    family: "development-content",
    shortDescription: "High-quality video and audio learning assets.",
    problemSolved: "We need to produce learning videos.",
    audience: ["Organizations", "Creators"],
    icon: "Video",
    status: "planned-part-2",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "contact"
  },

  // C. TECHNOLOGY AND PLATFORMS
  {
    id: "lms-implementation",
    title: "LMS Implementation & Migration",
    slug: "/services/lms-implementation-migration/",
    family: "technology-platforms",
    shortDescription: "Set up, organize, or move your LMS with clearer structure and safer migration.",
    problemSolved: "We need an LMS or platform implementation.",
    audience: ["Organizations", "Creators"],
    icon: "Database",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },
  {
    id: "platform-selection",
    title: "Platform Selection and Learning Technology",
    slug: "/services/platform-selection/",
    family: "technology-platforms",
    shortDescription: "Find the right learning platform for your specific needs.",
    problemSolved: "We don't know which platform to choose.",
    audience: ["Organizations", "Creators"],
    icon: "Search",
    status: "planned-part-3",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "review"
  },
  {
    id: "scorm-xapi",
    title: "SCORM and xAPI Support",
    slug: "/services/scorm-xapi/",
    family: "technology-platforms",
    shortDescription: "Ensure your courses track properly in standard learning systems.",
    problemSolved: "We need our courses to report completion.",
    audience: ["Organizations"],
    icon: "Settings",
    status: "planned-part-3",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "contact"
  },
  {
    id: "learning-analytics",
    title: "Learning Analytics and Reporting",
    slug: "/services/learning-analytics/",
    family: "technology-platforms",
    shortDescription: "Measure and report on learning effectiveness and engagement.",
    problemSolved: "We need to track learning outcomes.",
    audience: ["Organizations"],
    icon: "BarChart",
    status: "planned-part-3",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "contact"
  },

  // D. QUALITY, AI AND SUPPORT
  {
    id: "quality-assurance",
    title: "Quality Assurance and Accessibility",
    slug: "/services/quality-assurance/",
    family: "quality-ai-support",
    shortDescription: "Ensure your learning content is accurate, functional, and accessible.",
    problemSolved: "We need to test our learning content.",
    audience: ["Organizations", "Creators"],
    icon: "CheckCircle",
    status: "planned-part-3",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "review"
  },
  {
    id: "ai-powered",
    title: "AI-Supported E-Learning",
    slug: "/services/ai-powered-elearning/",
    family: "quality-ai-support",
    shortDescription: "Use AI-supported learning workflows to plan and structure digital learning experiences.",
    problemSolved: "We want to leverage AI in our learning design.",
    audience: ["Organizations", "Creators"],
    icon: "Cpu",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },
  {
    id: "ongoing-support",
    title: "Ongoing Support & Maintenance",
    slug: "/services/ongoing-support-maintenance/",
    family: "quality-ai-support",
    shortDescription: "Keep your learning system updated, secure, and running smoothly.",
    problemSolved: "We need ongoing learning support.",
    audience: ["Organizations", "Creators"],
    icon: "LifeBuoy",
    status: "live",
    publicVisibility: true,
    navigationVisibility: true,
    hubVisibility: true,
    ctaType: "contact"
  },
  {
    id: "managed-learning",
    title: "Managed Learning Services",
    slug: "/services/managed-learning/",
    family: "quality-ai-support",
    shortDescription: "Outsource the management and operation of your learning programs.",
    problemSolved: "We need a team to manage our learning operations.",
    audience: ["Organizations"],
    icon: "Briefcase",
    status: "planned-part-3",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "contact"
  },

  // E. GLOBAL LEARNING
  {
    id: "course-localization",
    title: "Course Localization and Translation",
    slug: "/services/course-localization/",
    family: "global-learning",
    shortDescription: "Translate and adapt courses for international audiences.",
    problemSolved: "We need to train a global workforce.",
    audience: ["Organizations"],
    icon: "Globe",
    status: "planned-part-4",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "contact"
  },
  {
    id: "global-rollout",
    title: "Global Learning Rollout Support",
    slug: "/services/global-rollout/",
    family: "global-learning",
    shortDescription: "Manage the deployment of learning programs across regions.",
    problemSolved: "We need to launch training globally.",
    audience: ["Organizations"],
    icon: "MapPin",
    status: "planned-part-4",
    publicVisibility: false,
    navigationVisibility: false,
    hubVisibility: false,
    ctaType: "contact"
  }
];

export const getLiveServices = () => serviceArchitecture.filter(s => s.status === 'live' && s.publicVisibility);
export const getHubServices = () => serviceArchitecture.filter(s => s.hubVisibility);
export const getNavigationServices = () => serviceArchitecture.filter(s => s.navigationVisibility);
export const getServiceById = (id: string) => serviceArchitecture.find(s => s.id === id);
export const getServicesByFamily = (family: ServiceFamily) => serviceArchitecture.filter(s => s.family === family && s.publicVisibility);

export const serviceFamiliesData = [
  {
    id: "strategy-design",
    title: "Strategy and Design",
    description: "Plan and structure your learning programs before building.",
    icon: "PenTool"
  },
  {
    id: "development-content",
    title: "Development and Content",
    description: "Build engaging courses, interactive eLearning, and multimedia assets.",
    icon: "MonitorPlay"
  },
  {
    id: "technology-platforms",
    title: "Technology and Platforms",
    description: "Select, implement, and integrate learning management systems.",
    icon: "Database"
  },
  {
    id: "quality-ai-support",
    title: "Quality, AI and Support",
    description: "Ensure quality, leverage AI workflows, and maintain your systems.",
    icon: "LifeBuoy"
  }
];
