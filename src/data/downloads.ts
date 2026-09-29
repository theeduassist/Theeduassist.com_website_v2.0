export interface DownloadAsset {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  badge: string;
  description: string;
  detailedOverview: string;
  targetAudience: string[];
  keyTopics: string[];
  technicalSpecs: {
    format: string;
    version: string;
    pageCount: string;
    accessType: string;
    governance: string;
  };
  driveUrl: string;
  driveEmbedUrl: string;
  relatedServiceUrl: string;
  relatedServiceLabel: string;
  seoTitle: string;
  seoDescription: string;
}

export const downloadAssets: DownloadAsset[] = [
  {
    slug: 'enterprise-capability-statement',
    title: 'Enterprise & Public Sector Capability Statement (2026)',
    shortTitle: 'Enterprise Capability Statement',
    eyebrow: 'Official Corporate & Public Sector Document',
    badge: 'Government & Enterprise SOW',
    description: 'The official 2026 capability statement detailing TheEduAssist\'s technical qualifications, Section 508 / WCAG 2.1 AA accessibility compliance, multi-agency LMS interoperability (SCORM 2004 4th Edition / xAPI), and agile milestone delivery framework.',
    detailedOverview: 'Engineered for public sector procurement directors, municipal committees, and enterprise L&D evaluators. This document provides complete institutional transparency into our instructional design methodologies (ADDIE & Cathy Moore Action Mapping), security protocols, bilateral NDA guarantees, and past verified project performance.',
    targetAudience: [
      'Federal, State, and Municipal Government Procurement Officers',
      'Chief Learning Officers & Enterprise HR Directors',
      'Vocational Training Institutes & RTO Leadership',
      'Compliance and Risk Oversight Committees'
    ],
    keyTopics: [
      'Section 508 and WCAG 2.1 Level AA Accessibility Verification',
      'Voluntary Product Accessibility Template (VPAT 2.4) Alignment',
      'SCORM 1.2, SCORM 2004 4th Edition, and xAPI Technical Architecture',
      'Security Protocols: Zero-Data AI Exposure & Bilateral NDA Enforcement',
      'Enterprise SLA: 24–48 Hour RFP Scoping Turnaround',
      'Verified Public Sector & Corporate Project Track Record'
    ],
    technicalSpecs: {
      format: 'PDF Document',
      version: '2026.1 Official Release',
      pageCount: '16 Pages',
      accessType: 'Direct Download & Instant Preview',
      governance: 'Public Sector & Enterprise Ready'
    },
    driveUrl: 'https://drive.google.com/file/d/1MRDPJwLv8Ie-cNaq4ehZxmyY7keD0PsB/view?usp=sharing',
    driveEmbedUrl: 'https://drive.google.com/file/d/1MRDPJwLv8Ie-cNaq4ehZxmyY7keD0PsB/preview',
    relatedServiceUrl: '/enterprise-solutions/government-and-public-sector-training/',
    relatedServiceLabel: 'Government & Public Sector Training Solutions',
    seoTitle: 'Enterprise & Public Sector Capability Statement 2026 | TheEduAssist',
    seoDescription: 'Download TheEduAssist official 2026 Capability Statement. Full specifications on Section 508 VPAT compliance, SCORM/xAPI multi-agency interoperability, and enterprise SLAs.'
  },
  {
    slug: '7-figure-course-blueprint',
    title: '7-Figure Course Architecture & Curriculum Blueprint',
    shortTitle: '7-Figure Course Blueprint',
    eyebrow: 'Executive Instructional Blueprint',
    badge: 'Flagship DFY Academy',
    description: 'The exact instructional architecture and curriculum framework used to structure, produce, and scale high-ticket online courses with 85%+ completion rates and sub-2% refund rates.',
    detailedOverview: 'Built for subject matter experts, digital coaches, corporate training leaders, and online academy founders. This blueprint eliminates passive "information dumps" by structuring modules around Cathy Moore\'s Action Mapping and Bloom\'s Revised Taxonomy.',
    targetAudience: [
      'Expert-Led Digital Academy Founders & Course Creators',
      'Corporate Executives Launching Client-Facing Academies',
      'Consulting Firms Productizing Proprietary Knowledge',
      'Training Companies Modernizing Legacy Workshops'
    ],
    keyTopics: [
      'The 4-Pillar Flagship Course Scaffolding Methodology',
      'Bloom\'s Revised Taxonomy Applied to Digital Microlearning',
      'Active Retention Mechanics: Fillable Workbooks & Practice Sandboxes',
      'Video Scripting Architecture for High Learner Engagement',
      'Kajabi, Skool & Custom LMS Deployment Architecture',
      'Student Offboarding & High-Ticket Ascendance Funnels'
    ],
    technicalSpecs: {
      format: 'PDF Playbook & Architectural Framework',
      version: '2026 Curriculum Standard',
      pageCount: '24 Pages',
      accessType: 'Direct Download & Instant Preview',
      governance: 'Commercial Academy Architecture'
    },
    driveUrl: 'https://drive.google.com/file/d/11dFVjs33k7_t1iypOIgp5ijw-YRfbxAd/view?usp=sharing',
    driveEmbedUrl: 'https://drive.google.com/file/d/11dFVjs33k7_t1iypOIgp5ijw-YRfbxAd/preview',
    relatedServiceUrl: '/services/course-development/',
    relatedServiceLabel: 'Done-For-You Course Creation & Curriculum Design',
    seoTitle: '7-Figure Course Architecture & Curriculum Blueprint | TheEduAssist',
    seoDescription: 'Download the 7-Figure Course Architecture Blueprint. Master high-retention instructional design, curriculum scaffolding, and LMS academy staging.'
  },
  {
    slug: 'enterprise-ld-roi-playbook',
    title: 'Enterprise L&D ROI & Kirkpatrick Measurement Playbook',
    shortTitle: 'Enterprise L&D ROI Playbook',
    eyebrow: 'Financial & Business Impact Framework',
    badge: 'Executive L&D Leadership',
    description: 'A mathematical and strategic blueprint for Chief Learning Officers and HR executives to measure, report, and prove corporate training ROI across all 4 Kirkpatrick evaluation levels.',
    detailedOverview: 'Stop defending training budgets with vanity "seat-time" and completion percentages. This playbook establishes practical formulas for quantifying productivity gains, error reduction, regulatory risk mitigation, and executive boardroom attribution.',
    targetAudience: [
      'Chief Learning Officers & VP of Talent Development',
      'Chief Financial Officers & Operational Budget Directors',
      'Enterprise Instructional Design Team Leads',
      'Corporate Strategy and Operational Excellence Teams'
    ],
    keyTopics: [
      'Kirkpatrick Levels 1–4 Applied to Digital Microlearning',
      'Formulas for Calculating Seat-Time Productivity Savings',
      'Quantifying Regulatory Risk Reduction & Penalty Avoidance',
      'xAPI Data Statements: Tracking Behavioral Competency in Real Workflows',
      'Executive Boardroom Reporting Deck Architecture',
      'Building the Multi-Year Enterprise Training Business Case'
    ],
    technicalSpecs: {
      format: 'PDF Executive Playbook & Calculation Models',
      version: '2026 Measurement Edition',
      pageCount: '20 Pages',
      accessType: 'Direct Download & Instant Preview',
      governance: 'Boardroom-Ready L&D Analytics'
    },
    driveUrl: 'https://drive.google.com/file/d/1Lip43u_O3O4qN5LsSlI3gi-DYsANV324/view?usp=sharing',
    driveEmbedUrl: 'https://drive.google.com/file/d/1Lip43u_O3O4qN5LsSlI3gi-DYsANV324/preview',
    relatedServiceUrl: '/services/learning-strategy/',
    relatedServiceLabel: 'Enterprise Learning Strategy & Analytics',
    seoTitle: 'Enterprise L&D ROI & Kirkpatrick Playbook | TheEduAssist',
    seoDescription: 'Download the Enterprise L&D ROI Playbook. Proven formulas for measuring corporate training impact across Kirkpatrick Levels 1-4 with xAPI analytics.'
  },
  {
    slug: 'procurement-rfp-evaluation-matrix',
    title: '40-Point Custom eLearning Vendor RFP Evaluation Matrix',
    shortTitle: '40-Point Vendor RFP Matrix',
    eyebrow: 'Public Sector & Corporate Procurement Tool',
    badge: 'Procurement Committee Rubric',
    description: 'An objective, weighted 40-point scoring rubric used by enterprise selection committees and government evaluation panels to assess custom eLearning vendor proposals.',
    detailedOverview: 'Selecting the wrong eLearning vendor leads to budget overruns, non-compliant SCORM packages, and failed audits. This matrix establishes clear scoring thresholds across technical architecture, accessibility standards (Section 508 / WCAG 2.1 AA), pedagogical rigor, and post-launch SLAs.',
    targetAudience: [
      'Procurement Officers & RFP Evaluation Committees',
      'Enterprise Learning Technology Directors',
      'Government Agency Contract Officers',
      'Legal & Compliance Risk Reviewers'
    ],
    keyTopics: [
      'Technical Architecture: SCORM 1.2, 2004 4th Edition, xAPI & cmi5 Validation',
      'Statutory Accessibility: VPAT 2.4 Documentation & Screen-Reader Verification',
      'Pedagogical Scaffolding: Scenario Branching & Active Decision Making',
      'Project Governance: Milestone-Based SOWs vs. Ambiguous Time-and-Materials',
      'Data Security: IP Ownership, Bilateral NDAs, and Zero-AI Model Training',
      'Post-Launch SLAs: 60-Day Compliance Warranty & LMS Handover Protocols'
    ],
    technicalSpecs: {
      format: 'PDF Scoring Matrix & Evaluation Rubric',
      version: '2026 Enterprise Procurement Release',
      pageCount: '12 Pages',
      accessType: 'Direct Download & Instant Preview',
      governance: 'Objective Procurement Standardization'
    },
    driveUrl: 'https://drive.google.com/file/d/1oiaSur9_aQlFFCaimr0756hhB-Vn3nyR/view?usp=sharing',
    driveEmbedUrl: 'https://drive.google.com/file/d/1oiaSur9_aQlFFCaimr0756hhB-Vn3nyR/preview',
    relatedServiceUrl: '/trust-centre/procurement/',
    relatedServiceLabel: 'TheEduAssist Procurement & Trust Centre',
    seoTitle: '40-Point eLearning Vendor RFP Evaluation Matrix | TheEduAssist',
    seoDescription: 'Download the 40-Point Custom eLearning Vendor RFP Matrix. Evaluate agency proposals across Section 508 compliance, SCORM architecture, and SLAs.'
  },
  {
    slug: 'rapid-storyboarding-toolkit',
    title: 'Rapid Storyboarding & Action Mapping Toolkit',
    shortTitle: 'Storyboarding & Action Mapping Toolkit',
    eyebrow: 'Instructional Design Production Asset',
    badge: 'Production & Storyboarding',
    description: 'The proven storyboarding framework and visual mapping template used by senior instructional designers to convert complex SME knowledge into interactive digital modules.',
    detailedOverview: 'Eliminate scope creep and endless revision cycles. This toolkit guides instructional designers and SMEs through rapid prototyping, scenario branching design, and visual asset cueing prior to authoring in Storyline, Rise, or custom HTML5.',
    targetAudience: [
      'Instructional Designers & eLearning Developers',
      'Corporate Subject Matter Experts (SMEs)',
      'Digital Curriculum Directors',
      'L&D Production Teams'
    ],
    keyTopics: [
      'Cathy Moore Action Mapping Framework for High-Stakes Training',
      '2-Column and 3-Column Storyboard Production Templates',
      'Branching Scenario Decision Trees for Ethical & Compliance Training',
      'Visual Cueing & Audio Script Timing Calculations',
      'SME Interview Protocol & Review Sign-Off Checklists',
      'Seamless Handover from Storyboard to Articulate Storyline / Rise'
    ],
    technicalSpecs: {
      format: 'PDF Toolkit & Production Templates',
      version: '2026 Instructional Release',
      pageCount: '18 Pages',
      accessType: 'Direct Download & Instant Preview',
      governance: 'Agile Instructional Production'
    },
    driveUrl: 'https://drive.google.com/file/d/1wqbKeD7pkSrNDlnGhy394fa_3DrwYYCP/view?usp=sharing',
    driveEmbedUrl: 'https://drive.google.com/file/d/1wqbKeD7pkSrNDlnGhy394fa_3DrwYYCP/preview',
    relatedServiceUrl: '/services/instructional-design/',
    relatedServiceLabel: 'Instructional Design & Curriculum Architecture',
    seoTitle: 'Rapid Storyboarding & Action Mapping Toolkit | TheEduAssist',
    seoDescription: 'Download the Rapid Storyboarding & Action Mapping Toolkit. Proven templates for converting SME knowledge into scenario-based digital learning modules.'
  }
];
