import { RuleTester } from "eslint";
// @ts-expect-error - plain ESM policy fragment shipped as a registry file.
import { auraPlugin } from "../registry/default/lint/eslint.aura-shadcn.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

const rule = auraPlugin.rules["no-icon-margin"];

ruleTester.run("aura/no-icon-margin", rule, {
  valid: [
    '<Button><PlusIcon className="icon" />Add</Button>',
    '<Button>Menu<CaretSortIcon className="icon ml-auto" /></Button>',
    '<Button><PlusIcon className="icon mt-0.5" />Add</Button>',
    '<div><PlusIcon className="icon mr-1" />Add</div>',
  ],
  invalid: [
    {
      code: '<Button><PlusIcon className="icon mr-1" />Add</Button>',
      output: '<Button><PlusIcon className="icon" />Add</Button>',
      errors: 1,
    },
    {
      code: '<Button>Next<ArrowRightIcon className="icon md:ml-0.5" /></Button>',
      output: '<Button>Next<ArrowRightIcon className="icon" /></Button>',
      errors: 1,
    },
    {
      code: '<Badge asChild><a href="/docs">Docs<ArrowTopRightIcon className="icon ml-0.5" /></a></Badge>',
      output:
        '<Badge asChild><a href="/docs">Docs<ArrowTopRightIcon className="icon" /></a></Badge>',
      errors: 1,
    },
    {
      code: '<a className="button-fill">Next<ArrowRightIcon className="icon ml-2" /></a>',
      output: '<a className="button-fill">Next<ArrowRightIcon className="icon" /></a>',
      errors: 1,
    },
    {
      code: '<Button><PlusIcon className={cn("icon", "mx-1")} />Add</Button>',
      output: null,
      errors: 1,
    },
  ],
});

