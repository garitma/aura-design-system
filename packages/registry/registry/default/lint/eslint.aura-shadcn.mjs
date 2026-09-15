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
 *
 * Besides the `@shadcn/lint` rules, this fragment ships the local `aura` plugin
 * with `aura/no-icon-margin` (see below).
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
 * Aura controls own the space between their icon and their label: `.button`
 * and the `button-fill|pill|link|menu` variants declare
 * `gap: var(--aura-button-gap)`, and `Badge` carries `gap-0.5`. A horizontal
 * margin on the icon stacks on top of that gap, so it drifts off the 13px grid
 * and ends up different at every call site.
 */
const CONTROL_CLASS = /^button(?:-(?:fill|pill|link|menu))?$/;
const HORIZONTAL_MARGIN = /^-?m[lrxse]-(.+)$/;
const ICON_COMPONENT = /Icon$/;

function jsxName(name) {
  if (!name) return "";
  if (name.type === "JSXIdentifier") return name.name;
  if (name.type === "JSXMemberExpression") return jsxName(name.property);
  if (name.type === "JSXNamespacedName") return name.name.name;
  return "";
}

function collectStrings(node, out) {
  if (!node) return out;
  switch (node.type) {
    case "Literal":
      if (typeof node.value === "string") out.push(node.value);
      break;
    case "JSXExpressionContainer":
      collectStrings(node.expression, out);
      break;
    case "TemplateLiteral":
      for (const quasi of node.quasis) out.push(quasi.value.cooked ?? "");
      for (const expression of node.expressions) collectStrings(expression, out);
      break;
    case "CallExpression":
      for (const argument of node.arguments) collectStrings(argument, out);
      break;
    case "ArrayExpression":
      for (const element of node.elements) collectStrings(element, out);
      break;
    case "ObjectExpression":
      for (const property of node.properties) {
        if (property.type !== "Property") continue;
        if (property.computed) continue;
        if (property.key.type === "Identifier") out.push(property.key.name);
        else collectStrings(property.key, out);
      }
      break;
    case "ConditionalExpression":
      collectStrings(node.consequent, out);
      collectStrings(node.alternate, out);
      break;
    case "LogicalExpression":
      collectStrings(node.left, out);
      collectStrings(node.right, out);
      break;
    default:
      break;
  }
  return out;
}

function classNameAttribute(openingElement) {
  return openingElement.attributes.find(
    (attribute) =>
      attribute.type === "JSXAttribute" && jsxName(attribute.name) === "className"
  );
}

function classTokens(openingElement) {
  const attribute = classNameAttribute(openingElement);
  if (!attribute) return [];
  return collectStrings(attribute.value, [])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
}

/** Strips Tailwind variants (`md:`, `hover:`) so `md:-ml-1` reads as `-ml-1`. */
function baseUtility(token) {
  return token.replace(/^(?:[^:\s[\]]+:)+/, "");
}

const noIconMargin = {
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description:
        "Disallow horizontal margins on icons inside controls that already own the icon/label gap.",
    },
    schema: [
      {
        type: "object",
        properties: {
          components: { type: "array", items: { type: "string" } },
          message: { type: "string" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      iconMargin: "{{message}}",
    },
  },
  create(context) {
    const options = context.options[0] ?? {};
    const controls = new Set(options.components ?? ["Button", "Badge"]);
    const template =
      options.message ??
      '"{{className}}" is not needed on an icon inside <{{component}}>: the control already spaces its icon from its label with a gap. Remove it, or change the gap on the component if the design needs one.';

    const ownsIconGap = (openingElement) =>
      controls.has(jsxName(openingElement.name)) ||
      classTokens(openingElement).some((token) => CONTROL_CLASS.test(token));

    const isIcon = (openingElement) => {
      const name = jsxName(openingElement.name);
      if (name === "svg" || ICON_COMPONENT.test(name)) return true;
      return classTokens(openingElement).includes("icon");
    };

    return {
      JSXOpeningElement(node) {
        if (!isIcon(node)) return;

        const attribute = classNameAttribute(node);
        if (!attribute) return;

        const offenders = classTokens(node).filter((token) => {
          const match = HORIZONTAL_MARGIN.exec(baseUtility(token));
          // `ml-auto` / `mx-auto` position the icon, they do not space it.
          return match !== null && match[1] !== "auto";
        });
        if (offenders.length === 0) return;

        const control = context.sourceCode
          .getAncestors(node)
          .filter((ancestor) => ancestor.type === "JSXElement")
          .find((ancestor) => ownsIconGap(ancestor.openingElement));
        if (!control) return;

        const component = jsxName(control.openingElement.name);
        for (const offender of offenders) {
          context.report({
            node: attribute,
            messageId: "iconMargin",
            data: {
              message: template
                .replace("{{className}}", offender)
                .replace("{{component}}", component),
            },
            fix(fixer) {
              // Only a plain string className can be rewritten safely.
              if (attribute.value?.type !== "Literal") return null;
              const next = attribute.value.value
                .split(/\s+/)
                .filter((token) => token && token !== offender)
                .join(" ");
              return fixer.replaceText(attribute.value, JSON.stringify(next));
            },
          });
        }
      },
    };
  },
};

export const auraPlugin = {
  meta: { name: "aura" },
  rules: { "no-icon-margin": noIconMargin },
};

/**
 * @param {unknown} shadcnPlugin - `import { plugin as shadcn } from "@shadcn/lint"`
 * @returns {import("eslint").Linter.Config[]}
 */
export function createAuraShadcnLintConfig(shadcnPlugin) {
  return [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: { shadcn: shadcnPlugin, aura: auraPlugin },
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
        "aura/no-icon-margin": "warn",
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
