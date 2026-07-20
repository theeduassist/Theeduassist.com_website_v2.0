import fs from 'fs';
import path from 'path';

console.log("Validating Blog Media...");

const publicDir = path.join(process.cwd(), 'public');
const ogDir = path.join(publicDir, 'og');
let errors = 0;

if (!fs.existsSync(ogDir)) {
    console.warn("⚠️ No og image directory found.");
} else {
    const files = fs.readdirSync(ogDir);
    for (const file of files) {
        if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) {
            console.error(`❌ Invalid media format found in public/og: ${file}`);
            errors++;
        }
    }
}

if (errors > 0) {
    console.error(`❌ Blog media validation failed with ${errors} errors.`);
    process.exit(1);
}

console.log("✅ Blog media validated successfully.");
process.exit(0);
