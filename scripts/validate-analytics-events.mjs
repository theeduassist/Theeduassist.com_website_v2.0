import fs from 'fs';
import path from 'path';

const eventContractPath = path.join(process.cwd(), 'src', 'lib', 'analytics', 'eventContract.ts');
if (fs.existsSync(eventContractPath)) {
  const content = fs.readFileSync(eventContractPath, 'utf-8');
  // Match string values assigned to events
  const events = [...content.matchAll(/export const [A-Z_]+\s*=\s*"([^"]+)"/g)].map(m => m[1]);
  for (const event of events) {
    if (/\s/.test(event)) {
      console.error(`Validation Error: Event name contains spaces: ${event}`);
      process.exit(1);
    }
  }
  console.log("Analytics events validated successfully.");
} else {
  console.log("Analytics event contract not found yet, skipping detailed validation.");
}
