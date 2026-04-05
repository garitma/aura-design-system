#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public");
const files = [
  "DESIGN.md",
  "index.html",
  "preview.html",
  "preview-dark.html",
];

fs.mkdirSync(out, { recursive: true });
for (const name of files) {
  const src = path.join(root, name);
  if (!fs.existsSync(src)) {
    console.error(`[design-md] Missing required file: ${src}`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(out, name));
}
console.log("[design-md] Prepared public/ for static deploy.");
