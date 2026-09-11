/**
 * Generates the Aura-branded sample deck used by the Presentation stories/docs.
 *
 * Run: npx tsx scripts/generate-presentation-fixture.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import PptxGenJSImport from "pptxgenjs";

// pptxgenjs ships CJS; interop shape differs between node and tsx.
const PptxGenJS = ((PptxGenJSImport as unknown as { default?: typeof PptxGenJSImport })
  .default ?? PptxGenJSImport) as typeof PptxGenJSImport;

type Pptx = InstanceType<typeof PptxGenJSImport>;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUTPUTS = [
  path.resolve(__dirname, "../public/fixtures/sample.pptx"),
  path.resolve(__dirname, "../../../apps/www/public/fixtures/sample.pptx"),
];

// Aura light theme tokens (apps/www/app/globals.css)
const accent = {
  3: "F1EAFE",
  6: "D7C0FA",
  9: "964CE1",
  10: "8841CE",
  11: "7D35C2",
  12: "421A68",
  contrast: "FFFFFF",
};

const gray = {
  1: "F6F9FF",
  2: "F0F6FF",
  3: "E3ECFF",
  6: "C2D4FF",
  9: "6D84D5",
  11: "4B5C9A",
  12: "121B48",
};

const SANS = "Inter";
const MONO = "Menlo";

// 13px grid expressed in inches at 96dpi: 13px = 0.1354in
const U = 13 / 96;
const MARGIN = U * 6; // 78px

function baseSlide(pptx: Pptx, options: { eyebrow: string }) {
  const slide = pptx.addSlide();
  slide.background = { color: gray[1] };

  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: U * 2,
    h: 7.5,
    fill: { color: accent[9] },
  });

  slide.addText(options.eyebrow.toUpperCase(), {
    x: MARGIN,
    y: MARGIN,
    w: 10,
    h: 0.3,
    fontFace: MONO,
    fontSize: 11,
    charSpacing: 2,
    color: accent[11],
  });

  return slide;
}

function build(pptx: Pptx) {
  // LAYOUT_WIDE is 13.333 x 7.5in; LAYOUT_16x9 is only 10 x 5.625in.
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Aura Design System";
  pptx.company = "Aura";
  pptx.title = "Aura Design System";

  // 1 — Cover
  const cover = pptx.addSlide();
  cover.background = { color: gray[12] };
  cover.addShape("rect", {
    x: 0,
    y: 0,
    w: U * 2,
    h: 7.5,
    fill: { color: accent[9] },
  });
  cover.addText("AURA DESIGN SYSTEM", {
    x: MARGIN,
    y: 1.9,
    w: 10,
    h: 0.35,
    fontFace: MONO,
    fontSize: 12,
    charSpacing: 3,
    color: accent[6],
  });
  cover.addText("Design tokens\nyou can install.", {
    x: MARGIN,
    y: 2.4,
    w: 10.5,
    h: 1.9,
    fontFace: SANS,
    fontSize: 54,
    bold: true,
    lineSpacingMultiple: 1.05,
    color: gray[1],
  });
  cover.addShape("rect", {
    x: MARGIN,
    y: 4.5,
    w: 0.9,
    h: 0.06,
    fill: { color: accent[9] },
  });
  cover.addText(
    "A 12-step accent and gray palette, fluid typography, and a 13px spacing grid — shipped as a shadcn registry.",
    {
      x: MARGIN,
      y: 4.8,
      w: 8.4,
      h: 0.9,
      fontFace: SANS,
      fontSize: 16,
      color: gray[6],
      lineSpacingMultiple: 1.3,
    }
  );
  cover.addText("pnpm dlx shadcn@latest add @aura/presentation", {
    x: MARGIN,
    y: 6.3,
    w: 8,
    h: 0.3,
    fontFace: MONO,
    fontSize: 12,
    color: accent[6],
  });

  // 2 — Palette
  const palette = baseSlide(pptx, { eyebrow: "01 / Color" });
  palette.addText("Twelve steps, one intent per step.", {
    x: MARGIN,
    y: 1.15,
    w: 11,
    h: 0.8,
    fontFace: SANS,
    fontSize: 34,
    bold: true,
    color: gray[12],
  });

  const steps = [
    "FAF9FC",
    "F7F4FC",
    "F1EAFE",
    "EBDEFF",
    "E2D1FE",
    "D7C0FA",
    "C9A9F5",
    "B78CEF",
    "964CE1",
    "8841CE",
    "7D35C2",
    "421A68",
  ];
  const swatchW = 0.86;
  steps.forEach((hex, index) => {
    const x = MARGIN + index * (swatchW + 0.08);
    palette.addShape("rect", {
      x,
      y: 2.3,
      w: swatchW,
      h: 1.5,
      fill: { color: hex },
      line: { color: gray[6], width: 0.5 },
    });
    palette.addText(String(index + 1), {
      x,
      y: 3.9,
      w: swatchW,
      h: 0.28,
      align: "center",
      fontFace: MONO,
      fontSize: 11,
      color: gray[11],
    });
  });

  const roles: [string, string][] = [
    ["1–2", "App and card backgrounds"],
    ["3–5", "Component fill: rest, hover, active"],
    ["6–8", "Borders, then focus rings"],
    ["9–10", "Solid brand fills"],
    ["11–12", "Low- and high-contrast text"],
  ];
  roles.forEach(([range, label], index) => {
    const y = 4.5 + index * 0.45;
    palette.addText(range, {
      x: MARGIN,
      y,
      w: 1,
      h: 0.35,
      fontFace: MONO,
      fontSize: 13,
      bold: true,
      color: accent[11],
    });
    palette.addText(label, {
      x: MARGIN + 1.1,
      y,
      w: 8,
      h: 0.35,
      fontFace: SANS,
      fontSize: 14,
      color: gray[11],
    });
  });

  // 3 — Typography
  const type = baseSlide(pptx, { eyebrow: "02 / Typography" });
  type.addText("Type scales with the viewport.", {
    x: MARGIN,
    y: 1.15,
    w: 11,
    h: 0.8,
    fontFace: SANS,
    fontSize: 34,
    bold: true,
    color: gray[12],
  });
  type.addText("clamp(min, 4.03vw, max) — every heading, every breakpoint.", {
    x: MARGIN,
    y: 1.95,
    w: 10,
    h: 0.35,
    fontFace: MONO,
    fontSize: 13,
    color: accent[11],
  });

  const scale: [string, string, number][] = [
    ["h1", "Aa — 1.98 to 3.05rem", 40],
    ["h2", "Aa — 1.59 to 2.44rem", 32],
    ["h3", "Aa — 1.48 to 2.28rem", 27],
    ["p", "Aa — 1rem body copy", 16],
  ];
  scale.forEach(([tag, sample, size], index) => {
    const y = 2.65 + index * 0.95;
    type.addText(tag, {
      x: MARGIN,
      y: y + 0.12,
      w: 0.7,
      h: 0.4,
      fontFace: MONO,
      fontSize: 12,
      color: gray[9],
    });
    type.addText(sample, {
      x: MARGIN + 0.85,
      y,
      w: 9.5,
      h: 0.75,
      fontFace: SANS,
      fontSize: size,
      bold: index < 3,
      color: index < 3 ? gray[12] : gray[11],
    });
  });

  // 4 — Spacing
  const spacing = baseSlide(pptx, { eyebrow: "03 / Spacing" });
  spacing.addText("Everything lands on 13px.", {
    x: MARGIN,
    y: 1.15,
    w: 11,
    h: 0.8,
    fontFace: SANS,
    fontSize: 34,
    bold: true,
    color: gray[12],
  });
  spacing.addText(
    "Tailwind utilities inherit --spacing: 13px, so p-4 is 52px — not 16px.",
    {
      x: MARGIN,
      y: 1.95,
      w: 10,
      h: 0.35,
      fontFace: SANS,
      fontSize: 15,
      color: gray[11],
    }
  );

  const units: [string, number][] = [
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
  ];
  units.forEach(([label, multiplier], index) => {
    const y = 2.9 + index * 1;
    spacing.addText(`p-${label}`, {
      x: MARGIN,
      y: y + 0.05,
      w: 0.8,
      h: 0.4,
      fontFace: MONO,
      fontSize: 13,
      color: accent[11],
    });
    spacing.addShape("rect", {
      x: MARGIN + 0.95,
      y,
      w: U * multiplier * 5,
      h: 0.5,
      fill: { color: index % 2 === 0 ? accent[9] : accent[6] },
    });
    spacing.addText(`${multiplier * 13}px`, {
      x: MARGIN + 1.05 + U * multiplier * 5,
      y: y + 0.05,
      w: 1.2,
      h: 0.4,
      fontFace: MONO,
      fontSize: 12,
      color: gray[11],
    });
  });

  // 5 — Surfaces
  const surfaces = baseSlide(pptx, { eyebrow: "04 / Surfaces" });
  surfaces.addText("Stack sheets before drawing lines.", {
    x: MARGIN,
    y: 1.15,
    w: 11,
    h: 0.8,
    fontFace: SANS,
    fontSize: 34,
    bold: true,
    color: gray[12],
  });

  const cards: [string, string, string, string][] = [
    ["gray-1", "Canvas", "F6F9FF", gray[12]],
    ["gray-2", "Card surface", "F0F6FF", gray[12]],
    ["gray-3", "Lifted / hover", "E3ECFF", gray[12]],
    ["accent-9", "Primary action", "964CE1", "FFFFFF"],
  ];
  cards.forEach(([token, label, fill, text], index) => {
    const x = MARGIN + index * 2.85;
    surfaces.addShape("roundRect", {
      x,
      y: 2.4,
      w: 2.6,
      h: 3.1,
      fill: { color: fill },
      line: { color: gray[6], width: 1 },
      rectRadius: 0.12,
    });
    surfaces.addText(token, {
      x: x + 0.22,
      y: 2.7,
      w: 2.2,
      h: 0.3,
      fontFace: MONO,
      fontSize: 12,
      color: text,
    });
    surfaces.addText(label, {
      x: x + 0.22,
      y: 4.6,
      w: 2.2,
      h: 0.6,
      fontFace: SANS,
      fontSize: 17,
      bold: true,
      color: text,
    });
  });

  surfaces.addText(
    "Borders at steps 6–8 only where structure has to read: dialogs, menus, and controls.",
    {
      x: MARGIN,
      y: 5.9,
      w: 10.5,
      h: 0.5,
      fontFace: SANS,
      fontSize: 15,
      color: gray[11],
    }
  );

  // 6 — Close
  const close = pptx.addSlide();
  close.background = { color: accent[12] };
  close.addShape("rect", {
    x: 0,
    y: 0,
    w: U * 2,
    h: 7.5,
    fill: { color: accent[9] },
  });
  close.addText("Install the system,\nnot the screenshots.", {
    x: MARGIN,
    y: 2.3,
    w: 10.5,
    h: 1.7,
    fontFace: SANS,
    fontSize: 44,
    bold: true,
    lineSpacingMultiple: 1.1,
    color: accent.contrast,
  });
  close.addText("auradesignsystem.com", {
    x: MARGIN,
    y: 4.4,
    w: 8,
    h: 0.4,
    fontFace: MONO,
    fontSize: 14,
    color: accent[6],
  });
}

async function main() {
  const pptx = new PptxGenJS();
  build(pptx);

  const buffer = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;

  for (const output of OUTPUTS) {
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, buffer);
    console.log(`[presentation-fixture] ${output} (${buffer.byteLength} bytes)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
