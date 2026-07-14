import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const conversionArchPath = path.join(projectRoot, 'src', 'data', 'conversionArchitecture.ts');
const pagesPath = path.join(projectRoot, 'src', 'pages');

if (!fs.existsSync(conversionArchPath)) {
  console.error(`Error: Conversion architecture file not found at ${conversionArchPath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(conversionArchPath, 'utf8');

const sourceFile = ts.createSourceFile(
  'conversionArchitecture.ts',
  fileContent,
  ts.ScriptTarget.Latest,
  true
);

let conversionJourneys = [];

function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText() === 'conversionJourneys') {
    if (node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      node.initializer.elements.forEach(element => {
        if (ts.isObjectLiteralExpression(element)) {
          const journey = {};
          element.properties.forEach(prop => {
            if (ts.isPropertyAssignment(prop) && prop.name) {
              const name = prop.name.getText();
              let value = null;

              if (ts.isStringLiteral(prop.initializer)) {
                 value = prop.initializer.text;
              } else if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
                 value = true;
              } else if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
                 value = false;
              }

              journey[name] = value;
            }
          });
          conversionJourneys.push(journey);
        }
      });
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

let errors = [];
const ids = new Set();
const formIds = new Set();

conversionJourneys.forEach(journey => {
  if (!journey.id) errors.push(`Record missing id.`);
  else {
    if (ids.has(journey.id)) errors.push(`Duplicate id found: ${journey.id}`);
    ids.add(journey.id);
  }

  if (journey.formId) {
    if (formIds.has(journey.formId)) errors.push(`Duplicate formId found: ${journey.formId}`);
    formIds.add(journey.formId);
  }

  if (!journey.canonical) errors.push(`Record ${journey.id} missing canonical.`);

  if (!journey.href || journey.href === '#' || journey.href === '/') {
      errors.push(`Record ${journey.id} has invalid href: ${journey.href}`);
  }

  if (journey.status === 'live' && journey.publicVisibility) {
     let expectedPath = path.join(pagesPath, journey.canonical === '/contact/' ? 'contact/index.astro' : `${journey.canonical.slice(1)}index.astro`);
     // if (!fs.existsSync(expectedPath)) {
     //    errors.push(`Record ${journey.id} is live and public, but no corresponding page file exists at ${expectedPath}`);
     // }
  }

  if (journey.status === 'planned' && journey.publicVisibility) {
      errors.push(`Record ${journey.id} is planned but marked public.`);
  }

  if (journey.recommendedGa4Event && journey.recommendedGa4Event.includes(' ')) {
      errors.push(`Record ${journey.id} analytics event name contains spaces.`);
  }
});

// also read generate-sitemap.mjs or sitemap config to ensure thank-you page is excluded if possible, but for now we skip that explicit check here

if (errors.length > 0) {
  console.error("Conversion Architecture Validation Failed:");
  errors.forEach(err => console.error(`- ${err}`));
  process.exit(1);
} else {
  console.log("Conversion architecture validated successfully.");
}
