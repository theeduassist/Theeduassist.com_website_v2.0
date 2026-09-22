import fs from 'fs';
import path from 'path';

const citiesFile = path.join(process.cwd(), 'src/data/cities.ts');
let content = fs.readFileSync(citiesFile, 'utf8');
const match = content.match(/export const cities = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Cities not found");
  process.exit(1);
}

let cities = eval(match[1]);
const seenTitles = new Map();
const seenDescs = new Map();
let fixedTitles = 0;
let fixedDescs = 0;

function getDisambiguatedSuffix(city) {
  if (city.country && city.country !== 'Global') return city.country;
  if (city.slug.includes('-pk-')) return 'Pakistan';
  if (city.slug.includes('-sri-lanka-')) return 'Sri Lanka';
  if (city.slug.includes('-ng-')) return 'Nigeria';
  if (city.slug.includes('-tz-')) return 'Tanzania';
  if (city.slug.includes('-et-')) return 'Ethiopia';
  if (city.slug.includes('-mz-')) return 'Mozambique';
  if (city.slug.includes('-zm-')) return 'Zambia';
  if (city.slug.includes('-zw-')) return 'Zimbabwe';
  if (city.slug.includes('-ao-')) return 'Angola';
  if (city.slug.includes('-sn-')) return 'Senegal';
  if (city.slug.includes('-ci-')) return 'Ivory Coast';
  if (city.slug.includes('-sd-')) return 'Sudan';
  if (city.slug.includes('-ly-')) return 'Libya';
  if (city.slug.includes('-tn-')) return 'Tunisia';
  if (city.slug.includes('-dz-')) return 'Algeria';
  if (city.slug.includes('-lb-')) return 'Lebanon';
  if (city.slug.includes('-tr-')) return 'Turkey';
  return 'Regional Hub';
}

for (let city of cities) {
  let t = city.metaTitle || '';
  if (!t.includes('TheEduAssist')) t += ' | TheEduAssist';
  
  if (seenTitles.has(t)) {
    const suffix = getDisambiguatedSuffix(city);
    city.metaTitle = `E-Learning Development Services in ${city.cityName} (${suffix}) | TheEduAssist`;
    fixedTitles++;
    console.log(`Fixed title collision for: ${city.slug} -> ${city.metaTitle}`);
  } else {
    seenTitles.set(t, city);
  }

  let d = city.metaDescription || '';
  if (seenDescs.has(d)) {
    const suffix = getDisambiguatedSuffix(city);
    city.metaDescription = `TheEduAssist helps ${city.cityName} (${suffix}) organizations, coaches, and enterprises build custom e-learning courses, LMS architectures, and training systems.`;
    fixedDescs++;
    console.log(`Fixed description collision for: ${city.slug} -> ${city.metaDescription}`);
  } else {
    seenDescs.set(d, city);
  }
}

fs.writeFileSync(citiesFile, 'export const cities = ' + JSON.stringify(cities, null, 2) + ';\n', 'utf8');
console.log(`Done! Fixed ${fixedTitles} titles and ${fixedDescs} descriptions in cities.ts.`);
