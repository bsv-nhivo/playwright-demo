import fs from 'fs';

export function readCsv(filePath: string): string[][] {
  const content = fs.readFileSync(filePath, 'utf8');

  return content
    .trim()
    .split('\n')
    .map((row) => row.split(','));
}