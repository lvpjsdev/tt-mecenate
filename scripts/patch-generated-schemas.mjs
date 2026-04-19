/**
 * Adds `export {};` to generated *.schemas.ts files that don't have any
 * imports/exports, so TypeScript treats them as ES modules rather than
 * global scripts.
 */
import fs from 'fs';
import path from 'path';

const dir = './src/shared/api/generated';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const schemaFiles = walk(dir).filter((f) => f.endsWith('.schemas.ts'));

for (const file of schemaFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('export {}')) {
    fs.writeFileSync(file, content + '\nexport {};\n');
    console.log(`Patched: ${file}`);
  }
}
