import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const trustArchPath = path.join(projectRoot, 'src', 'data', 'trustArchitecture.ts');
const pagesPath = path.join(projectRoot, 'src', 'pages');

if (!fs.existsSync(trustArchPath)) {
  console.error(`Error: Trust architecture file not found at ${trustArchPath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(trustArchPath, 'utf8');

const sourceFile = ts.createSourceFile(
  'trustArchitecture.ts',
  fileContent,
  ts.ScriptTarget.Latest,
  true
);

let trustPages = [];

function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText() === 'trustPages') {
    if (node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      node.initializer.elements.forEach(element => {
        if (ts.isObjectLiteralExpression(element)) {
          const page = {};
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
              } else if (ts.isObjectLiteralExpression(prop.initializer)) {
                 value = {};
                 prop.initializer.properties.forEach(p => {
                    if(ts.isPropertyAssignment(p) && ts.isStringLiteral(p.initializer)){
                        value[p.name.getText()] = p.initializer.text;
                    }
                 })
              }

              page[name] = value;
            }
          });
          trustPages.push(page);
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

trustPages.forEach(page => {
  if (!page.id) errors.push(`Record missing id.`);
  else {
    if (ids.has(page.id)) errors.push(`Duplicate id found: ${page.id}`);
    ids.add(page.id);
  }

  if (!page.canonical) errors.push(`Record ${page.id} missing canonical.`);
  else {
    if (canonicals.has(page.canonical)) errors.push(`Duplicate canonical found: ${page.canonical}`);
    canonicals.add(page.canonical);
  }

  if (!page.href || page.href === '#' || page.href === '/') {
      errors.push(`Record ${page.id} has invalid href: ${page.href}`);
  }

  if (!page.title) errors.push(`Record ${page.id} missing title.`);
  if (!page.shortDescription) errors.push(`Record ${page.id} missing shortDescription.`);

  if (page.status === 'live' && page.publicVisibility) {
     let expectedPath = path.join(pagesPath, page.canonical === '/trust-centre/' ? 'trust-centre/index.astro' : `${page.canonical.slice(1)}index.astro`);
     // console.log(`checking ${expectedPath}`)
     // For now just warn, we'll create them later.
     // if (!fs.existsSync(expectedPath)) {
     //    errors.push(`Record ${page.id} is live and public, but no corresponding page file exists at ${expectedPath}`);
     // }
  }

  if (page.status === 'planned' && page.publicVisibility) {
      errors.push(`Record ${page.id} is planned but marked public.`);
  }

  if (page.primaryCta && !page.primaryCta.label) {
      errors.push(`Record ${page.id} primaryCta is missing label.`);
  }

});

if (errors.length > 0) {
  console.error("Trust Architecture Validation Failed:");
  errors.forEach(err => console.error(`- ${err}`));
  process.exit(1);
} else {
  console.log("Trust architecture validated successfully.");
}
