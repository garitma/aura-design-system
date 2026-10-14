import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const SERVER_SAFE_COMPONENTS = ["ui/Button.tsx", "ui/ButtonGroup.tsx"];

describe("server-safe components", () => {
  it.each(SERVER_SAFE_COMPONENTS)(
    "%s avoids createContext, which React's server build does not export",
    (file) => {
      const source = readFileSync(
        resolve(__dirname, "../registry/default/components", file),
        "utf8",
      );
      expect(source).not.toMatch(/\bcreateContext\b/);
      expect(source).not.toMatch(/^["']use client["']/m);
    },
  );
});
