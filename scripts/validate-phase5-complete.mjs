import fs from 'fs';
import path from 'path';

console.log("Validating Phase 5 Complete...");

// Verify that all part 4 markdown files exist
const reportsDir = path.join(process.cwd(), 'reports');
const docsDir = path.join(process.cwd(), 'docs');

const requiredFiles = [
    'reports/website-2.5-phase-5-part-4-accessibility.md',
    'reports/website-2.5-phase-5-part-4-author-review.md',
    'reports/website-2.5-phase-5-part-4-baseline.md',
    'reports/website-2.5-phase-5-part-4-claim-audit.md',
    'reports/website-2.5-phase-5-part-4-content-inventory.md',
    'docs/WEBSITE_2_5_PHASE_5_PART_4.md',
    'docs/WEBSITE_2_5_PHASE_5_COMPLETE.md'
];

let errors = 0;

for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(process.cwd(), file))) {
        console.error(`❌ Required file missing: ${file}`);
        errors++;
    }
}

if (errors > 0) {
    console.error(`❌ Phase 5 completeness validation failed with ${errors} errors.`);
    process.exit(1);
}

console.log("✅ Phase 5 complete validated successfully.");
process.exit(0);
