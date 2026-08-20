import { readFileSync, writeFileSync } from 'fs';

const realCities = [
  { name: "Djibouti City", country: "Djibouti", region: "africa", slug: "djibouti-city" },
  { name: "Mogadishu", country: "Somalia", region: "africa", slug: "mogadishu" },
  { name: "Asmara", country: "Eritrea", region: "africa", slug: "asmara" },
  { name: "Juba", country: "South Sudan", region: "africa", slug: "juba" },
  { name: "Khartoum", country: "Sudan", region: "africa", slug: "khartoum-sd" },
  { name: "Port Sudan", country: "Sudan", region: "africa", slug: "port-sudan" },
  { name: "Tripoli", country: "Libya", region: "africa", slug: "tripoli-ly" },
  { name: "Benghazi", country: "Libya", region: "africa", slug: "benghazi" },
  { name: "Tunis", country: "Tunisia", region: "africa", slug: "tunis-tn" },
  { name: "Sfax", country: "Tunisia", region: "africa", slug: "sfax" },
  { name: "Algiers", country: "Algeria", region: "africa", slug: "algiers-dz" },
  { name: "Oran", country: "Algeria", region: "africa", slug: "oran" },
  { name: "Rabat", country: "Morocco", region: "africa", slug: "rabat" },
  { name: "Fes", country: "Morocco", region: "africa", slug: "fes" },
  { name: "Marrakech", country: "Morocco", region: "africa", slug: "marrakech" },
  { name: "Tangier", country: "Morocco", region: "africa", slug: "tangier" },
  { name: "Alexandria", country: "Egypt", region: "middle-east", slug: "alexandria" },
  { name: "Giza", country: "Egypt", region: "middle-east", slug: "giza" },
  { name: "Sharm el-Sheikh", country: "Egypt", region: "middle-east", slug: "sharm-el-sheikh" },
  { name: "Hurghada", country: "Egypt", region: "middle-east", slug: "hurghada" },
  { name: "Sanaa", country: "Yemen", region: "middle-east", slug: "sanaa" },
  { name: "Aden", country: "Yemen", region: "middle-east", slug: "aden" },
  { name: "Sulaymaniyah", country: "Iraq", region: "middle-east", slug: "sulaymaniyah" },
  { name: "Najaf", country: "Iraq", region: "middle-east", slug: "najaf" },
  { name: "Karbala", country: "Iraq", region: "middle-east", slug: "karbala" },
  { name: "Ahvaz", country: "Iran", region: "middle-east", slug: "ahvaz" },
  { name: "Qom", country: "Iran", region: "middle-east", slug: "qom" },
  { name: "Rasht", country: "Iran", region: "middle-east", slug: "rasht" },
  { name: "Haifa", country: "Israel", region: "middle-east", slug: "haifa" },
  { name: "Tel Aviv", country: "Israel", region: "middle-east", slug: "tel-aviv" },
  { name: "Jerusalem", country: "Israel", region: "middle-east", slug: "jerusalem" },
  { name: "Gaza", country: "Palestine", region: "middle-east", slug: "gaza" },
  { name: "Ramallah", country: "Palestine", region: "middle-east", slug: "ramallah" },
  { name: "Irbid", country: "Jordan", region: "middle-east", slug: "irbid" },
  { name: "Zarqa", country: "Jordan", region: "middle-east", slug: "zarqa" },
  { name: "Tripoli", country: "Lebanon", region: "middle-east", slug: "tripoli-lb" },
  { name: "Sidon", country: "Lebanon", region: "middle-east", slug: "sidon" },
  { name: "Aleppo", country: "Syria", region: "middle-east", slug: "aleppo" },
  { name: "Homs", country: "Syria", region: "middle-east", slug: "homs" },
  { name: "Izmir", country: "Turkey", region: "middle-east", slug: "izmir-tr" },
  { name: "Bursa", country: "Turkey", region: "middle-east", slug: "bursa" },
  { name: "Antalya", country: "Turkey", region: "middle-east", slug: "antalya" },
  { name: "Adana", country: "Turkey", region: "middle-east", slug: "adana" },
  { name: "Gaziantep", country: "Turkey", region: "middle-east", slug: "gaziantep" },
  { name: "Konya", country: "Turkey", region: "middle-east", slug: "konya" },
  { name: "Kayseri", country: "Turkey", region: "middle-east", slug: "kayseri" },
  { name: "Mersin", country: "Turkey", region: "middle-east", slug: "mersin" },
  { name: "Diyarbakir", country: "Turkey", region: "middle-east", slug: "diyarbakir" },
  { name: "Trabzon", country: "Turkey", region: "middle-east", slug: "trabzon" },
  { name: "Eskisehir", country: "Turkey", region: "middle-east", slug: "eskisehir" },
  { name: "Samsun", country: "Turkey", region: "middle-east", slug: "samsun" },
  { name: "Denizli", country: "Turkey", region: "middle-east", slug: "denizli" },
  { name: "Kocaeli", country: "Turkey", region: "middle-east", slug: "kocaeli" },
  { name: "Malatya", country: "Turkey", region: "middle-east", slug: "malatya" },
  { name: "Erzurum", country: "Turkey", region: "middle-east", slug: "erzurum" },
  { name: "Van", country: "Turkey", region: "middle-east", slug: "van-tr" },
  { name: "Sanliurfa", country: "Turkey", region: "middle-east", slug: "sanliurfa" },
  { name: "Manisa", country: "Turkey", region: "middle-east", slug: "manisa" },
]

// Read the cities file
let content = readFileSync('src/data/cities.ts', 'utf8');

// Replace cities 101-500 (index 0-399 in realCities array)
for (let i = 0; i < realCities.length; i++) {
  const cityNum = 444 + i;
  const city = realCities[i];
  const oldName = `City ${cityNum}`;
  const oldSlug = `city-${cityNum}-elearning-development`;
  const newSlug = `${city.slug}-elearning-development`;

  content = content.replace(`"cityName": "${oldName}"`, `"cityName": "${city.name}"`);
  content = content.replace(`"slug": "${oldSlug}"`, `"slug": "${newSlug}"`);
  content = content.replace(`"metaTitle": "E-Learning Development Services in ${oldName}`, `"metaTitle": "E-Learning Development Services in ${city.name}`);
  content = content.replace(`"metaDescription": "TheEduAssist helps ${oldName}`, `"metaDescription": "TheEduAssist helps ${city.name}`);
  content = content.replace(`"h1": "E-Learning Development Services in ${oldName}"`, `"h1": "E-Learning Development Services in ${city.name}"`);
  content = content.replace(`TheEduAssist provides remote eLearning development and LMS setup for clients in ${oldName}`, `TheEduAssist helps ${city.name}-based coaches, consultants, companies, and training teams turn raw content into structured online courses, Kajabi programs, and LMS modules.`);
  content = content.replace(`TheEduAssist provides remote eLearning development for ${oldName}`, `TheEduAssist offers remote eLearning development and LMS implementation for clients in ${city.name}.`);
  content = content.replace(`Standard training needs for ${oldName}`, `${city.name}-based businesses and training teams need structured online learning systems that are scalable and easy to update.`);

  console.log(`✅ Replaced City ${cityNum} with ${city.name}`);
}

writeFileSync('src/data/cities.ts', content, 'utf8');
console.log('Done! All cities updated.');