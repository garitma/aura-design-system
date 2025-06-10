import fs from 'fs';
import path from 'path';

const directory = path.resolve('./public/r/');
const oldUrl = 'https://auradesignsystem.com';
const newUrl = 'http://localhost:3000';

function replaceUrlsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(new RegExp(oldUrl, 'g'), newUrl);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log(`Updated URLs in: ${filePath}`);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      replaceUrlsInFile(fullPath);
    }
  }
}

processDirectory(directory);
