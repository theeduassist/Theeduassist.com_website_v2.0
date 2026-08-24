import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/data/cities.ts', 'utf8');

// Generate FAQs for a city
function generateFaqs(cityName) {
  return [
    {
      q: `Does TheEduAssist work with clients in ${cityName}?`,
      a: `Yes, TheEduAssist works remotely with clients in ${cityName}. We provide eLearning development, LMS implementation, Kajabi setup, and course design services to businesses, coaches, consultants, and training teams in ${cityName} and surrounding areas.`
    },
    {
      q: `What eLearning services are available in ${cityName}?`,
      a: `TheEduAssist offers a full range of eLearning services for ${cityName}-based clients including custom course development, instructional design, LMS setup and migration, Kajabi builds, SCORM/xAPI content, AI-powered learning assets, and ongoing support.`
    },
    {
      q: `How does TheEduAssist deliver projects for ${cityName} clients?`,
      a: `All projects are delivered remotely. ${cityName} clients share their content, goals, and requirements via a structured onboarding process. TheEduAssist then designs, builds, and delivers the final eLearning product digitally, with regular check-ins and reviews throughout.`
    },
    {
      q: `What LMS platforms does TheEduAssist support for ${cityName} businesses?`,
      a: `TheEduAssist supports all major LMS platforms for ${cityName} clients including Kajabi, Moodle, Canvas, Blackboard, Docebo, Cornerstone, TalentLMS, LearnUpon, Absorb LMS, and more. We help with implementation, migration, and content upload.`
    },
    {
      q: `How long does an eLearning project take for a ${cityName} client?`,
      a: `Project timelines vary based on scope. A single course module typically takes 2-4 weeks. A full LMS implementation or Kajabi build may take 4-8 weeks. TheEduAssist offers a free 24-48 hour review to assess your project and provide a clear timeline estimate.`
    }
  ];
}

// Find cities with empty faqQuestions and add FAQs
const cityPattern = /"cityName":\s*"([^"]+)"[\s\S]*?"faqQuestions":\s*\[\]/g;
let match;
let count = 0;

while ((match = cityPattern.exec(content)) !== null) {
  const cityName = match[1];
  const faqs = generateFaqs(cityName);
  const faqsJson = JSON.stringify(faqs, null, 6).replace(/^/gm, '    ');
  
  // Replace empty faqQuestions with populated ones
  const oldStr = match[0];
  const newStr = oldStr.replace('"faqQuestions": []', `"faqQuestions": ${faqsJson}`);
  content = content.replace(oldStr, newStr);
  
  count++;
  if (count % 50 === 0) console.log(`✅ Processed ${count} cities...`);
}

writeFileSync('src/data/cities.ts', content, 'utf8');
console.log(`✅ Done! Added FAQs to ${count} cities.`);