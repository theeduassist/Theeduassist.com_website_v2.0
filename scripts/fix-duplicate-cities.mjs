import { readFileSync, writeFileSync } from 'fs';

const duplicateSlugs = [
  'lahore-pk-elearning-development',
  'karachi-pk-elearning-development',
  'hyderabad-pk-elearning-development',
  'abuja-ng-elearning-development',
  'dar-es-salaam-tz-elearning-development',
  'addis-ababa-et-elearning-development',
  'maputo-mz-elearning-development',
  'lusaka-zm-elearning-development',
  'harare-zw-elearning-development',
  'luanda-ao-elearning-development',
  'dakar-sn-elearning-development',
  'abidjan-ci-elearning-development',
  'tripoli-ly-elearning-development',
  'tunis-tn-elearning-development',
  'algiers-dz-elearning-development',
  'tripoli-lb-elearning-development',
  'izmir-tr-elearning-development',
  'van-tr-elearning-development',
  'colombo-sri-lanka-elearning-development',
  'lahore-pk-elearning-development',
  'victoria-canada-elearning-development',
  'abuja-elearning-development',
  'lusaka-elearning-development',
  'harare-elearning-development',
  'luanda-elearning-development',
  'dakar-elearning-development',
  'abidjan-elearning-development',
  'dar-es-salaam-elearning-development',
  'addis-ababa-elearning-development',
  'maputo-elearning-development',
];

let content = readFileSync('src/data/cities.ts', 'utf8');

for (const slug of duplicateSlugs) {
  // Find the slug and set its indexStatus to noindex
  const regex = new RegExp(`("slug":\\s*"${slug}"[\\s\\S]*?"indexStatus":\\s*)"index"`, 'g');
  const newContent = content.replace(regex, '$1"noindex"');
  if (newContent !== content) {
    console.log(`✅ Set noindex: ${slug}`);
    content = newContent;
  }
}

writeFileSync('src/data/cities.ts', content, 'utf8');
console.log('Done!');