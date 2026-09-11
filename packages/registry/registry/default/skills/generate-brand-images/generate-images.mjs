#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, isAbsolute, relative, resolve } from "node:path";

const MODEL = "gemini-2.5-flash-image";
const ALLOWED_ASPECTS = new Set([
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
]);

function usage(exitCode = 1) {
  console.error(`Usage:
  pnpm ai:image -- --manifest <plan.json> [--dry-run]
  pnpm ai:image -- --identity <note.md> --prompt "..." --output <path> [--aspect 16:9] [--dry-run]

The script reads GOOGLE_API_KEY or GEMINI_API_KEY from .env.`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = argv[0] === "--" ? argv.slice(1) : argv;
  const value = (flag) => {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : undefined;
  };

  if (args.includes("--help") || args.includes("-h")) usage(0);

  const manifest = value("--manifest");
  if (manifest) {
    return { manifest, dryRun: args.includes("--dry-run") };
  }

  const identity = value("--identity");
  const prompt = value("--prompt");
  const output = value("--output");
  if (!identity || !prompt || !output) usage();

  return {
    identity,
    images: [
      {
        prompt,
        output,
        aspectRatio: value("--aspect") ?? "16:9",
      },
    ],
    dryRun: args.includes("--dry-run"),
  };
}

function parseDotEnv(content) {
  const parsed = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    parsed[match[1]] = value;
  }
  return parsed;
}

function loadProjectEnv(projectRoot) {
  const envPath = resolve(projectRoot, ".env");
  if (!existsSync(envPath)) return;
  const values = parseDotEnv(readFileSync(envPath, "utf8"));
  for (const [name, value] of Object.entries(values)) {
    if (process.env[name] === undefined) process.env[name] = value;
  }
}

function apiKey() {
  const key = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error(
      "MISSING_GEMINI_API_KEY: Add GOOGLE_API_KEY or GEMINI_API_KEY to .env, or ask the agent to use its native image-generation fallback.",
    );
  }
  return key;
}

function projectPath(projectRoot, input, label) {
  const absolute = resolve(projectRoot, input);
  const fromRoot = relative(projectRoot, absolute);
  if (
    isAbsolute(fromRoot) ||
    fromRoot === ".." ||
    fromRoot.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)
  ) {
    throw new Error(`${label} must stay inside the project: ${input}`);
  }
  return absolute;
}

function validateImage(image, index) {
  if (!image || typeof image !== "object") {
    throw new Error(`images[${index}] must be an object`);
  }
  if (typeof image.prompt !== "string" || !image.prompt.trim()) {
    throw new Error(`images[${index}].prompt is required`);
  }
  if (typeof image.output !== "string" || !image.output.trim()) {
    throw new Error(`images[${index}].output is required`);
  }
  const aspectRatio = image.aspectRatio ?? "16:9";
  if (!ALLOWED_ASPECTS.has(aspectRatio)) {
    throw new Error(
      `images[${index}].aspectRatio must be one of ${[...ALLOWED_ASPECTS].join(", ")}`,
    );
  }
  return { prompt: image.prompt.trim(), output: image.output, aspectRatio };
}

function readPlan(args, projectRoot) {
  if (!args.manifest) {
    return {
      identity: args.identity,
      images: args.images.map(validateImage),
      dryRun: args.dryRun,
    };
  }

  const manifestPath = projectPath(projectRoot, args.manifest, "Manifest path");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (typeof manifest.identity !== "string" || !manifest.identity.trim()) {
    throw new Error("Manifest identity must point to a blueprint identity note");
  }
  if (!Array.isArray(manifest.images) || manifest.images.length === 0) {
    throw new Error("Manifest images must contain at least one image");
  }
  return {
    identity: manifest.identity,
    images: manifest.images.map(validateImage),
    dryRun: args.dryRun,
  };
}

function readIdentity(projectRoot, identityInput) {
  const identityPath = projectPath(projectRoot, identityInput, "Identity path");
  if (!existsSync(identityPath)) {
    throw new Error(`Identity note not found: ${identityInput}`);
  }
  const identity = readFileSync(identityPath, "utf8").trim();
  if (!identity) throw new Error(`Identity note is empty: ${identityInput}`);
  if (/status:\s*needs-definition/i.test(identity)) {
    throw new Error(
      `IMAGE_IDENTITY_NOT_READY: Define ${identityInput} and set status: ready before generating.`,
    );
  }
  return identity.slice(0, 50_000);
}

function buildPrompt(identity, request) {
  return [
    "Create one polished production-ready image for a digital product.",
    "Follow this brand image identity as the source of truth:",
    "<image-identity>",
    identity,
    "</image-identity>",
    `Image request: ${request}`,
    "Render absolutely no text, lettering, logos, labels, captions, UI copy, or watermarks. Text and interface labels will be added in HTML.",
    "Keep the main subject crop-safe for responsive web use and avoid visual artifacts.",
  ].join("\n");
}

function extensionForMime(mimeType) {
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return ".jpg";
  if (mimeType.includes("webp")) return ".webp";
  return ".png";
}

function outputForMime(projectRoot, output, mimeType) {
  const requested = projectPath(projectRoot, output, "Output path");
  const extension = extensionForMime(mimeType);
  const currentExtension = extname(requested);
  return currentExtension
    ? requested.slice(0, -currentExtension.length) + extension
    : requested + extension;
}

async function generate(key, prompt, aspectRatio) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["IMAGE"],
          responseFormat: {
            image: { aspectRatio },
          },
        },
      }),
    },
  );
  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message ?? response.statusText;
    throw new Error(`Gemini API ${response.status}: ${message}`);
  }

  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (!part.inlineData?.data) continue;
    return {
      bytes: Buffer.from(part.inlineData.data, "base64"),
      mimeType: part.inlineData.mimeType || "image/png",
    };
  }

  const modelText = parts
    .map((part) => part.text)
    .filter(Boolean)
    .join("\n");
  throw new Error(
    modelText
      ? `No image returned. Model response: ${modelText}`
      : "No image returned by Gemini.",
  );
}

async function main() {
  const projectRoot = process.cwd();
  loadProjectEnv(projectRoot);
  const args = parseArgs(process.argv.slice(2));
  const plan = readPlan(args, projectRoot);
  const identity = readIdentity(projectRoot, plan.identity);
  const requests = plan.images.map((image) => ({
    ...image,
    resolvedPrompt: buildPrompt(identity, image.prompt),
  }));

  if (plan.dryRun) {
    for (const [index, image] of requests.entries()) {
      console.log(`--- image ${index + 1}: ${image.output} (${image.aspectRatio}) ---`);
      console.log(image.resolvedPrompt);
    }
    return;
  }

  const key = apiKey();
  console.log(`model=${MODEL} images=${requests.length}`);
  for (const image of requests) {
    const generated = await generate(
      key,
      image.resolvedPrompt,
      image.aspectRatio,
    );
    const outputPath = outputForMime(
      projectRoot,
      image.output,
      generated.mimeType,
    );
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, generated.bytes);
    console.log(`saved ${relative(projectRoot, outputPath)}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
