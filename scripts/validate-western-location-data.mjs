import fs from 'fs';

function parseTSFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
    return JSON.parse(jsonStr);
}

const regions = parseTSFile('src/data/locations/western-regions.ts');
const countries = parseTSFile('src/data/locations/western-countries.ts');
const cities = parseTSFile('src/data/locations/western-cities.ts');

const allLocations = [...regions, ...countries, ...cities];

const errors = [];
const warnings = [];

const slugs = new Set();

for (const loc of allLocations) {
  if (!loc.name) errors.push(`Missing name in ${loc.slug || 'unknown'}`);

  if (loc.type === 'city') {
    if (!loc.country) errors.push(`Missing country in city ${loc.name}`);
    if (!loc.region) errors.push(`Missing region in city ${loc.name}`);
    if (loc.country === 'Global') errors.push(`City ${loc.name} marked as Global`);
    if (loc.region === 'global') errors.push(`City ${loc.name} marked as Global region`);
  }

  // Broken relationship paths
  if (loc.relevantServices) {
      loc.relevantServices.forEach(s => {
          if (!s.startsWith('/services/')) errors.push(`Broken service path ${s} in ${loc.name}`);
      });
  }
  if (loc.relevantResources) {
      loc.relevantResources.forEach(r => {
          if (!r.startsWith('/blog/') && !r.startsWith('/resources/')) errors.push(`Broken resource path ${r} in ${loc.name}`);
      });
  }

  // FAQ duplication warning
  if (loc.faqs) {
      loc.faqs.forEach(f => {
          if (f.q.includes("What is the difference between Kajabi and an LMS?")) {
              warnings.push(`Frequently duplicated FAQ found in ${loc.name}`);
          }
      });
  }

  if (slugs.has(loc.slug)) {
    errors.push(`Duplicate slug: ${loc.slug}`);
  }
  slugs.add(loc.slug);

  if (!loc.canonicalPath || !loc.canonicalPath.startsWith("https://www.theeduassist.com/")) {
    errors.push(`Malformed or non-www canonical: ${loc.canonicalPath} in ${loc.name}`);
  }

  if (!loc.indexStatus) {
    errors.push(`Missing indexStatus in ${loc.name}`);
  }

  if (loc.indexStatus === 'index') {
    if (!loc.faqs || loc.faqs.length === 0) errors.push(`Indexable page ${loc.name} lacking FAQs`);
    if (!loc.relevantServices || loc.relevantServices.length === 0) errors.push(`Indexable page ${loc.name} lacking services`);
    if (!loc.researchSourceIds || loc.researchSourceIds.length === 0) errors.push(`Indexable page ${loc.name} missing source IDs`);
  }

  if (loc.heroIntroduction && loc.heroIntroduction.includes("...")) {
      warnings.push(`Ellipses used as unfinished copy in ${loc.name}`);
  }
  if (loc.heroIntroduction && loc.heroIntroduction.includes("Lorem ipsum")) {
      errors.push(`Placeholder text found in ${loc.name}`);
  }
}

const validationOutput = {
  totalRecords: allLocations.length,
  errorsCount: errors.length,
  warningsCount: warnings.length,
  errors,
  warnings,
  status: errors.length === 0 ? "Pass" : "Fail"
};

fs.writeFileSync('reports/agent1-western-data-validation.json', JSON.stringify(validationOutput, null, 2));

if (errors.length > 0) {
  console.error("Validation failed with critical errors:");
  console.error(errors.join("\n"));
  process.exit(1);
} else {
  console.log("Validation passed successfully.");
  if (warnings.length > 0) {
      console.warn("Warnings:");
      console.warn(warnings.join("\n"));
  }
}
