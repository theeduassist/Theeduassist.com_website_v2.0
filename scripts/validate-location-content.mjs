import fs from 'fs';
import path from 'path';

let hasErrors = false;

// We will read the TS files as raw strings for simple validation,
// or just use node child_process to compile and run.
// Easier to parse the generated HTML for published routes in dist/locations/
import { globSync } from 'glob';

const locationFiles = globSync('dist/locations/**/*.html');

locationFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const route = file.replace('dist', '').replace('/index.html', '/') || '/';

    // Verify Title
    if (!content.match(/<title>([^<]+)<\/title>/i)) {
        console.error(`❌ Missing title in ${route}`);
        hasErrors = true;
    }

    // Verify Description
    if (!content.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"[^>]*>/i) && !content.match(/<meta[^>]*content="([^"]+)"[^>]*name="description"[^>]*>/i)) {
        console.error(`❌ Missing description in ${route}`);
        hasErrors = true;
    }

    // Verify H1
    if (!content.match(/<h1[^>]*>([^<]+)<\/h1>/i)) {
        console.error(`❌ Missing H1 in ${route}`);
        hasErrors = true;
    }

});

if (hasErrors) {
    console.error('\n🚨 Location content validation failed.');
    process.exit(1);
} else {
    console.log('\n🎉 Location content validation passed.');
}
