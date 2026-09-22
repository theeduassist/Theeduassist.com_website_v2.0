import fs from 'fs';
import path from 'path';

const citiesFile = path.join(process.cwd(), 'src/data/cities.ts');
let content = fs.readFileSync(citiesFile, 'utf8');

// Rich city data profiles
const cityProfiles = {
  "New York": {
    priorityTier: 1,
    localLanguage: {
      primaryLanguage: "English (US) with Multilingual Spanish & Mandarin delivery",
      nativeGreeting: "New York's Premier Digital Learning & Enterprise LMS Design Partner",
      culturalEthos: "High-velocity Wall Street execution, data-driven ROI, and uncompromising digital accessibility standards",
      businessEtiquette: "Direct, action-oriented communication, tight milestone deadlines, and agile executive reporting."
    },
    topPlacesAndHubs: {
      commercialDistricts: ["Midtown Manhattan Corporate Hub", "Financial District (Wall Street)", "Silicon Alley Tech Corridor", "DUMBO Tech Triangle", "Hudson Yards"],
      academicInstitutions: ["Columbia University", "New York University (NYU Stern)", "Cornell Tech", "Fordham University"]
    },
    cityHistoryAndLearning: {
      historicalContext: "From historic printing press publishing and maritime trade to the global capital of finance, media, and venture-backed SaaS.",
      trainingEvolution: "Shift from mandatory ballroom seminars and paper training binders to automated Kajabi creator academies and SOC 2-compliant cloud LMS infrastructure."
    },
    faqQuestions: [
      { q: "Do your New York training courses comply with NYS Sexual Harassment Prevention mandates?", a: "Yes. All corporate compliance modules we design for New York employers strictly satisfy New York State and NYC annual sexual harassment prevention training mandates, including interactive scenarios and comprehension tracking." },
      { q: "Can you help Wall Street financial institutions with FINRA and SEC training compliance?", a: "Yes. We engineer secure, audit-ready training modules aligned with FINRA, SEC, and anti-money laundering (AML) regulatory standards with verifiable learner tracking." },
      { q: "Do you design courses for New York-based Kajabi creators and executive coaches?", a: "Yes. We build high-converting Kajabi academies, VIP coaching portals, community hubs, and automated sales funnels for Manhattan, Brooklyn, and Tri-State consultants." },
      { q: "Are your New York digital courses ADA Title III and Section 508 compliant?", a: "Yes. Every public academy and corporate learning system we build adheres to WCAG 2.1 AA accessibility guidelines, ensuring screen-reader support, closed captions, and accessible contrast." },
      { q: "Which LMS platforms do you implement for Silicon Alley tech startups in NYC?", a: "We specialize in rapid implementations and migrations across Docebo, TalentLMS, LearnUpon, Workday Learning, and Kajabi, depending on whether you require internal employee upskilling or customer education." },
      { q: "How do you handle remote collaboration with New York corporate L&D teams?", a: "We maintain dedicated Eastern Time (ET) sync hours, collaborative Figma/Slack workflows, and rapid 24-hour turnaround sprints for Tri-State enterprise stakeholders." },
      { q: "Can you convert legacy PowerPoint decks into interactive HTML5 e-learning for New York teams?", a: "Yes. We convert static PPT slides and PDFs into interactive Articulate Storyline, Rise 360, and SCORM/xAPI packages featuring real workplace simulations." },
      { q: "Do you offer multilingual course localization for diverse New York workforces?", a: "Yes. We provide end-to-end voiceover, text translation, and cultural localization in Spanish, Mandarin, French, and other metropolitan business languages." },
      { q: "How long does an end-to-end custom course build take for a New York enterprise?", a: "Standard interactive modules typically deliver within 2 to 4 weeks. Multi-module curriculum architectures and full LMS migrations generally complete in 5 to 8 weeks." },
      { q: "How can New York organizations get started with TheEduAssist?", a: "You can book a free 24–48 hour project and LMS audit where our senior instructional designers review your content, platform, and training goals to provide a concrete roadmap." }
    ]
  },
  "Tokyo": {
    priorityTier: 1,
    localLanguage: {
      primaryLanguage: "Japanese (日本語) and International Business English",
      nativeGreeting: "ようこそ — 東京の企業向けLMS・オンラインコース開発パートナー",
      culturalEthos: "Kaizen (改善) — Continuous iterative perfection, meticulous zero-defect QA, and structured consensus (Nemawashi)",
      businessEtiquette: "Respectful honorific language (Keigo), precision scheduling, and structured documentation."
    },
    topPlacesAndHubs: {
      commercialDistricts: ["Marunouchi Financial Hub", "Otemachi Enterprise Center", "Shibuya Bit Valley", "Roppongi Hills Tech Cluster", "Shinagawa Corporate Hub"],
      academicInstitutions: ["University of Tokyo (Todai)", "Waseda University", "Keio University", "Tokyo Institute of Technology"]
    },
    cityHistoryAndLearning: {
      historicalContext: "From Edo-period merchant craftsmanship and Meiji industrialization to global leadership in precision robotics and corporate Keiretsu.",
      trainingEvolution: "Evolution from lifetime employment on-the-job training (OJT) apprenticeships to SCORM-compliant enterprise compliance portals and microlearning for rail commuters."
    },
    faqQuestions: [
      { q: "Do you design bilingual Japanese and English e-learning courses for Tokyo enterprises?", a: "Yes. We develop fully bilingual Japanese (日本語) and English digital courses with precise honorific phrasing (Keigo), professional voiceovers, and localized typography." },
      { q: "How do your courses support Kaizen and continuous improvement initiatives in Tokyo?", a: "Our instructional architecture incorporates iterative microlearning loops, interactive process simulations, and root-cause analysis modules aligned with Japanese manufacturing and tech standards." },
      { q: "Are your modules compatible with legacy Japanese corporate LMS platforms?", a: "Yes. All modules are packaged in SCORM 1.2, SCORM 2004, and xAPI formats tested for flawless playback across Japanese enterprise platforms, Docebo, and Cornerstone." },
      { q: "Can you build mobile-friendly microlearning for Tokyo commuters?", a: "Yes. We specialize in responsive mobile microlearning optimized for fast offline loading, enabling rail commuters to complete 3-to-5 minute modules on smartphones." },
      { q: "Do you build technical onboarding for robotics and precision manufacturing firms in Tokyo?", a: "Yes. We translate engineering schematics and operational SOPs into 3D-assisted interactive procedural guides and safety compliance modules." },
      { q: "How do you align with Japanese Labor Standards Act training requirements?", a: "We structure mandatory corporate training—including workplace safety, information security, and harassment prevention—in strict compliance with Ministry of Health, Labour and Welfare guidelines." },
      { q: "Can you help Tokyo universities and EdTech startups launch global courses on Kajabi or Thinkific?", a: "Yes. We design global academies with multi-currency checkout (JPY, USD), English/Japanese community spaces, and automated certification." },
      { q: "How do you coordinate project milestones with Tokyo executive teams across time zones?", a: "We offer dedicated Japan Standard Time (JST) overlapping hours, structured project management dashboards, and bilingual milestone reporting." },
      { q: "What authoring tools do you use for Tokyo enterprise clients?", a: "We develop primarily in Articulate Storyline 360, Rise 360, and custom HTML5 engines to guarantee high visual fidelity and smooth Japanese font rendering." },
      { q: "How do Tokyo organizations initiate an e-learning consultation with TheEduAssist?", a: "Contact us through our online portal to schedule a complimentary 24–48 hour curriculum audit and receive an architectural roadmap tailored to your Tokyo team." }
    ]
  },
  "Seoul": {
    priorityTier: 1,
    localLanguage: {
      primaryLanguage: "Korean (한국어) and Business English",
      nativeGreeting: "서울의 차세대 이러닝 및 LMS 개발 파트نر — TheEduAssist",
      culturalEthos: "Ppalli-Ppalli (빨리빨리) speed with high academic rigor and K-EdTech mobile microlearning",
      businessEtiquette: "High regard for prompt communication, structured hierarchical clarity, and seamless Kakao/mobile integration."
    },
    topPlacesAndHubs: {
      commercialDistricts: ["Teheran Valley (Gangnam)", "Pangyo Techno Valley", "Digital Media City (DMC)", "Yeouido Financial District", "Gasan Digital Complex"],
      academicInstitutions: ["Seoul National University (SNU)", "Korea University", "Yonsei University (SKY)", "KAIST Seoul Campus"]
    },
    cityHistoryAndLearning: {
      historicalContext: "From a post-war manufacturing and educational reconstruction miracle (the Miracle on the Han River) to the world's most hyper-connected digital economy.",
      trainingEvolution: "Rapid transition from rigorous Hagwon cram schooling and in-person Chaebol workshops to mobile-first, AI-driven corporate LMS microlearning."
    },
    faqQuestions: [
      { q: "Do you provide Korean (한국어) and English bilingual e-learning development in Seoul?", a: "Yes. We create native Korean and English bilingual modules featuring high-quality Hangul typography, local cultural context, and professional narration." },
      { q: "How fast can you deliver training modules for fast-paced Seoul tech teams?", a: "Embracing Seoul's dynamic business speed, our agile instructional design sprints deliver functional interactive prototypes within 7 to 10 days and full deployments in 3 to 4 weeks." },
      { q: "Can you design mobile-first e-learning optimized for South Korea's high mobile penetration?", a: "Yes. Our courses are mobile-responsive from the ground up, optimized for lightning-fast 5G mobile consumption and microlearning on mobile devices." },
      { q: "Do your training architectures comply with South Korea's PIPA data privacy regulations?", a: "Yes. All enterprise LMS setups and learner tracking frameworks adhere to South Korea's Personal Information Protection Act (PIPA) and international data governance standards." },
      { q: "Do you build technical onboarding for gaming studios and electronics companies in Pangyo and Gangnam?", a: "Yes. We develop technical software training, developer onboarding, and digital content workflows tailored to Seoul's world-leading gaming and IT sectors." },
      { q: "Can you integrate corporate courses with Kakao or local notification channels?", a: "Yes. We configure webhooks and automated messaging to trigger course reminders, completion badges, and certificates through corporate messaging tools." },
      { q: "Which LMS platforms do you support for Seoul universities and corporate academies?", a: "We architect and migrate systems across Docebo, Moodle, Canvas, TalentLMS, and Kajabi, with full Hangul character support and local payment options." },
      { q: "How do you coordinate with Seoul L&D managers across time zones?", a: "We maintain dedicated Korea Standard Time (KST) coordination hours, rapid turnaround communication, and detailed sprint retrospectives." },
      { q: "Can you convert legacy textbook or PowerPoint training into interactive SCORM modules for Seoul teams?", a: "Yes. We transform traditional corporate manuals into interactive, gamified SCORM/xAPI modules featuring quizzes and interactive decision trees." },
      { q: "How can Seoul organizations request an audit of their current courseware?", a: "Submit your project details via our website to receive a comprehensive, complimentary 24–48 hour training evaluation from our instructional design team." }
    ]
  },
  "London": {
    priorityTier: 1,
    localLanguage: {
      primaryLanguage: "British English (UK)",
      nativeGreeting: "London's Leading Instructional Design & Enterprise LMS Agency",
      culturalEthos: "Rigorous pedagogical standards, CPD accreditation, and inclusive, accessible learning architecture",
      businessEtiquette: "Collaborative professionalism, structured project governance, and strict GDPR compliance."
    },
    topPlacesAndHubs: {
      commercialDistricts: ["The City of London Financial Square Mile", "Canary Wharf Banking Hub", "Silicon Roundabout (Old Street)", "Kings Cross Tech Hub", "Mayfair Consulting Hub"],
      academicInstitutions: ["Imperial College London", "University College London (UCL)", "London School of Economics (LSE)", "King's College London"]
    },
    cityHistoryAndLearning: {
      historicalContext: "From Victorian guild apprenticeships and commercial shipping institutions to Europe's leading FinTech, EdTech, and professional services hub.",
      trainingEvolution: "Progression from Royal Charter continuous professional development (CPD) classrooms to blended Moodle/Totara corporate environments and AI-assisted onboarding."
    },
    faqQuestions: [
      { q: "Are your London e-learning courses eligible for UK CPD accreditation?", a: "Yes. We design structured, outcome-based courseware with learning logs, formative assessments, and rubrics specifically aligned with UK CPD standards." },
      { q: "Do you ensure strict UK GDPR and Data Protection Act 2018 compliance?", a: "Yes. All our LMS implementations and learner tracking architectures adhere to UK GDPR, ensuring consent management, data encryption, and role-based access controls." },
      { q: "Can you develop compliance training for Canary Wharf and City of London financial institutions?", a: "Yes. We build audit-ready training in FCA compliance, Anti-Money Laundering (AML), insider trading prevention, and operational resilience." },
      { q: "Do you build accessible e-learning courses aligned with the UK Equality Act 2010?", a: "Yes. All course modules conform to WCAG 2.1 AA accessibility standards, providing screen-reader compatibility, keyboard navigation, and full audio transcripts." },
      { q: "Which LMS platforms do you recommend for London corporate teams?", a: "We frequently implement and migrate Totara, Moodle Workplace, Docebo, TalentLMS, and LearnUpon for UK enterprises, alongside Kajabi for consulting academies." },
      { q: "How do you collaborate with London corporate L&D leaders during UK business hours?", a: "Our team operates with dedicated GMT/BST working hours to ensure real-time communication, rapid sprint reviews, and proactive project management." },
      { q: "Can you migrate legacy Flash or older SCORM content to modern HTML5?", a: "Yes. We specialize in zero-loss legacy course conversions, upgrading outdated formats to responsive, mobile-ready HTML5 and xAPI formats." },
      { q: "Do you design courses for London coaching businesses and professional academies on Kajabi?", a: "Yes. We build high-converting Kajabi membership portals, video masterclasses, and automated marketing funnels for London creators and consultancies." },
      { q: "How long does a bespoke corporate e-learning project take to complete in London?", a: "Single interactive modules generally deliver within 2 to 4 weeks, while enterprise-wide curricula and platform rollouts take 6 to 9 weeks." },
      { q: "How can London businesses get started with a free training review?", a: "Request a free 24–48 hour course and LMS audit on our website to receive an actionable diagnostic report from our senior learning architects." }
    ]
  },
  "Dubai": {
    priorityTier: 1,
    localLanguage: {
      primaryLanguage: "Arabic (العربية) and English (International Business)",
      nativeGreeting: "مرحباً بكم في إديو أسیست — شريككم المعتمد لتطوير التعليم الإلكتروني في دبي",
      culturalEthos: "Visionary AI-first digital transformation, world-class luxury standards, and bilingual Middle Eastern knowledge excellence",
      businessEtiquette: "Warm hospitality, relationship-first partnerships, and rapid adoption of cutting-edge technological innovations."
    },
    topPlacesAndHubs: {
      commercialDistricts: ["DIFC (Dubai International Financial Centre)", "Dubai Internet City", "Dubai Knowledge Park", "Business Bay", "Dubai Silicon Oasis"],
      academicInstitutions: ["American University in Dubai (AUD)", "University of Wollongong Dubai", "Middlesex University Dubai", "Heriot-Watt University Dubai"]
    },
    cityHistoryAndLearning: {
      historicalContext: "From historic creek trade and pearl diving settlements into the GCC's premier hyper-modern metropolis and international knowledge capital under Dubai Vision D33.",
      trainingEvolution: "Evolution from traditional executive hotel workshops to national Emiratisation digital academies, bilingual RTL LMS systems, and AI-powered government upskilling."
    },
    faqQuestions: [
      { q: "Do you design bilingual Arabic and English courses with Right-to-Left (RTL) support in Dubai?", a: "Yes. We engineer seamless dual-language courses featuring native Arabic Right-to-Left (RTL) typography, professional Arabic voiceovers, and parallel English tracks." },
      { q: "Do your training programs align with UAE KHDA and Emiratisation guidelines?", a: "Yes. We structure curricula to align with Knowledge and Human Development Authority (KHDA) standards and UAE national workforce Emiratisation training mandates." },
      { q: "Can you build compliance and onboarding training for DIFC financial institutions?", a: "Yes. We create audit-ready modules covering DFSA financial compliance, AML regulations, cybersecurity governance, and executive leadership." },
      { q: "Which LMS platforms do you deploy for UAE government entities and enterprises?", a: "We implement enterprise platforms including Docebo, Cornerstone, Moodle, and customized LMS architectures hosted securely within local UAE cloud infrastructure." },
      { q: "Do you support UAE regional payment gateways (Telr, Tap, Stripe) for course creators in Dubai?", a: "Yes. We configure multi-currency checkouts supporting AED, SAR, and USD with regional payment gateway integrations on Kajabi and custom platforms." },
      { q: "How do you coordinate with Dubai corporate teams across the UAE working week?", a: "We operate across Gulf Standard Time (GST) with seamless Sunday-to-Thursday / Monday-to-Friday schedules for executive syncs and sprint delivery." },
      { q: "Can you convert physical training manuals and PowerPoint decks into interactive e-learning?", a: "Yes. We turn paper binders and static presentations into SCORM/xAPI-compliant interactive courses with 3D simulations and knowledge assessments." },
      { q: "Do you design custom onboarding portals for hospitality, aviation, and retail in Dubai?", a: "Yes. We build high-retention frontline and luxury customer experience onboarding programs tailored to Dubai's signature service standards." },
      { q: "How long does a bilingual enterprise course take to deliver for a Dubai client?", a: "Single bilingual modules typically complete within 3 to 4 weeks. Complex enterprise academies and multi-tier curricula deliver in 6 to 8 weeks." },
      { q: "How can Dubai organizations request an initial consultation with TheEduAssist?", a: "Book a complimentary 24–48 hour training audit on our website, and our senior Gulf region instructional designers will provide a customized project proposal." }
    ]
  }
};

console.log("Enriching priority cities in cities.ts...");

// Parse cities array from cities.ts
const match = content.match(/export const cities = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Could not find cities array in cities.ts");
  process.exit(1);
}

let cities = eval(match[1]);
let updatedCount = 0;

for (let city of cities) {
  const profile = cityProfiles[city.cityName];
  if (profile) {
    city.priorityTier = profile.priorityTier;
    city.indexStatus = "index"; // Keep indexed!
    city.localLanguage = profile.localLanguage;
    city.topPlacesAndHubs = profile.topPlacesAndHubs;
    city.cityHistoryAndLearning = profile.cityHistoryAndLearning;
    city.faqQuestions = profile.faqQuestions;
    updatedCount++;
    console.log(`✅ Successfully enriched ${city.cityName} with native cultural data and 10 FAQs.`);
  }
}

const newTsContent = `export const cities = ${JSON.stringify(cities, null, 2)};\n`;
fs.writeFileSync(citiesFile, newTsContent, 'utf8');
console.log(`Done! Enriched ${updatedCount} priority global hubs.`);
