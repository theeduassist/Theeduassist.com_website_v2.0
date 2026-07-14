import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const enterpriseArchPath = path.join(projectRoot, 'src', 'data', 'enterpriseArchitecture.ts');
const pagesPath = path.join(projectRoot, 'src', 'pages');

if (!fs.existsSync(enterpriseArchPath)) {
  console.error(`Error: Enterprise architecture file not found at ${enterpriseArchPath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(enterpriseArchPath, 'utf8');

const sourceFile = ts.createSourceFile(
  'enterpriseArchitecture.ts',
  fileContent,
  ts.ScriptTarget.Latest,
  true
);

let enterpriseSolutions = [];

function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText() === 'enterpriseSolutions') {
    if (node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      node.initializer.elements.forEach(element => {
        if (ts.isObjectLiteralExpression(element)) {
          const solution = {};
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
              } else if (ts.isArrayLiteralExpression(prop.initializer)) {
                 value = prop.initializer.elements.map(e => ts.isStringLiteral(e) ? e.text : e.getText());
              }

              solution[name] = value;
            }
          });
          enterpriseSolutions.push(solution);
        }
      });
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

let errors = [];
const ids = new Set();
const canonicals = new Set();

enterpriseSolutions.forEach(solution => {
  if (!solution.id) errors.push(`Record missing id.`);
  else {
    if (ids.has(solution.id)) errors.push(`Duplicate id found: ${solution.id}`);
    ids.add(solution.id);
  }

  if (!solution.canonical) errors.push(`Record ${solution.id} missing canonical.`);
  else {
    if (canonicals.has(solution.canonical)) errors.push(`Duplicate canonical found: ${solution.canonical}`);
    canonicals.add(solution.canonical);
  }

  if (solution.status === 'live' && solution.publicVisibility) {
     let expectedPath = path.join(pagesPath, solution.canonical === '/enterprise-solutions/' ? 'enterprise-solutions/index.astro' : `${solution.canonical.slice(1)}index.astro`);
     // if (!fs.existsSync(expectedPath)) {
     //    errors.push(`Record ${solution.id} is live and public, but no corresponding page file exists at ${expectedPath}`);
     // }
  }
});

if (errors.length > 0) {
  console.error("Enterprise Architecture Validation Failed:");
  errors.forEach(err => console.error(`- ${err}`));
  process.exit(1);
} else {
  console.log("Enterprise architecture validated successfully.");
}
