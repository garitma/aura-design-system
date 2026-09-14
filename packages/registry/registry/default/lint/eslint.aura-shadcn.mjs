/**
 * Aura @shadcn/lint policy fragment.
 *
 * Install: pnpm dlx shadcn@latest add @aura/eslint-shadcn-lint
 * Deps:   pnpm add -D @shadcn/lint  (ESLint >= 9.30, Node >= 20.19)
 *
 * Merge into eslint.config.mjs:
 *
 *   import { plugin as shadcn } from "@shadcn/lint"
 *   import { createAuraShadcnLintConfig } from "./eslint.aura-shadcn.mjs"
 *
 *   export default [
 *     ...existingConfig,
 *     ...createAuraShadcnLintConfig(shadcn),
 *   ]
 *
 * Adjust `settings.shadcn.ui` / `components/ui/**` override if your tree differs.
 */

const formControlRestyle = {
  pattern: "^(Input|Textarea|SelectTrigger|MaskInput|SegmentedInput)$",
  allow: ["layout"],
  message: {
    spacing:
      "Input owns its padding; use layout/width only. Add a size/variant on the component if the design needs different padding.",
    typography:
      "Do not shrink form control font size (Aura floor is 17px).",
    default:
      "{{component}} owns its appearance; use layout/width only, or add a variant if the design needs one.",
  },
};

/**
 * @param {unknown} shadcnPlugin - `import { plugin as shadcn } from "@shadcn/lint"`
 * @returns {import("eslint").Linter.Config[]}
 */
export function createAuraShadcnLintConfig(shadcnPlugin) {
  return [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: { shadcn: shadcnPlugin },
      settings: {
        shadcn: {
          ui: "@/components/ui",
          note: "See DESIGN.md and .cursor/rules for Aura policy.",
        },
      },
      rules: {
        "shadcn/no-arbitrary-values": [
          "warn",
          {
            message:
              'Use Aura\'s 13px spacing scale (p-1=13px, p-1.5≈19.5px). No "{{className}}". Prefer {{replacement|a theme scale value}}.',
          },
        ],
        "shadcn/no-raw-colors": [
          "warn",
          {
            message:
              'Use accent/gray steps or semantic tokens from {{file}}. Avoid "{{className}}".',
          },
        ],
        "shadcn/no-restyle": [
          "warn",
          {
            allow: ["layout"],
            contracts: [
              formControlRestyle,
              {
                pattern:
                  "^(Form|FormField|FormCheckboxGroup|FormRadioGroup|FormAlert)$",
                allow: ["layout", "spacing"],
              },
              {
                pattern: "^Button$",
                allow: ["layout", "w-full"],
                message: {
                  spacing:
                    "Use a Button size ({{sizes|none defined}}) or margin/gap on the parent. Add a size on the component only if the design needs one.",
                  default:
                    "Use a Button variant ({{variants|none defined}}) or layout classes only.",
                },
              },
            ],
            message: {
              spacing:
                "Use a {{component}} size ({{sizes|none defined}}) or gap/margin on the parent. Add a size/variant on the component if the design needs different spacing.",
              default:
                "Use a {{component}} variant ({{variants|none defined}}) or layout classes only.",
            },
          },
        ],
      },
    },
    {
      files: ["components/ui/**"],
      rules: {
        "shadcn/no-restyle": "off",
        "shadcn/no-arbitrary-values": "off",
      },
    },
  ];
}
