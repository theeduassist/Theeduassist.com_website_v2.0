
import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve('reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

let validationResult = { status: "success", errors: [], warnings: [] };

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
     validationResult.errors.push("Missing file: " + filePath);
     return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('country: "Global"')) {
      validationResult.errors.push("City marked as Global in " + filePath);
  }
  if (content.includes('region: "global"')) {
      validationResult.errors.push("Region marked as global in " + filePath);
  }
  if (!content.includes('indexStatus')) {
      validationResult.errors.push("Missing indexStatus in " + filePath);
  }
  if (content.includes('placeholder')) {
      validationResult.warnings.push("Placeholder text found in " + filePath);
  }
  if (content.includes('...')) {
      validationResult.warnings.push("Unfinished ellipses found in " + filePath);
  }
  return content;
}

const regionsContent = checkFile('src/data/locations/eastern-regions.ts');
const countriesContent = checkFile('src/data/locations/eastern-countries.ts');
const citiesContent = checkFile('src/data/locations/eastern-cities.ts');

fs.writeFileSync(path.join(reportsDir, 'agent2-eastern-data-validation.json'), JSON.stringify(validationResult, null, 2));

if (validationResult.errors.length > 0) {
    console.error("Validation failed with errors:", validationResult.errors);
    process.exit(1);
} else {
    console.log("Validation passed.");
}
