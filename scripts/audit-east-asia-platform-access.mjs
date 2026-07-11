import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(process.cwd(), 'src/data/locations/east-asia-cities.ts'), 'utf8');

let errors = 0;
// Test if Japan/Korea are erroneously claiming access blocked issues
if (file.includes('platformAccessConsiderations: \'Subject to Japan internet policies. Testing is required.\'')) {
    console.error('Error: Japan has incorrect firewall claims.');
    errors++;
}

if (errors > 0) {
  process.exit(1);
} else {
  console.log('Platform access audit passed.');
}
