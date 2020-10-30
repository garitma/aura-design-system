![cover](https://images.prismic.io/garitma/fab89786-299e-4738-aa9e-738b8b29893f_aura-design-system-meditate.png?auto=compress,format?auto=format&w=320)
<br/>
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

# Aura Design system

Welcome to the source code repository for [Garitma Aura Design System](https://auradesignsystem.com/), brought to you by [Garitma](https://garitma.com/).

Aura Design System is...

- Tailored for building Garitma apps: Using the Aura like a space unit.
- Space-oriented design system. Each object has a halo of light that surrounds it, it's aura.

An aura is equal to `13px`.

Therefore 2 units would be equal to `26px`.

The configuration of these units is free while keeping in whole units or half (1 or 1.5).

## Install

```
npm i aura-design-system
```

## Use

#### HTML Setup

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="path/to/aura-desing-system/core/style.css" />
  </head>
  <body>
    <script src="path/to/your/bundle.js"></script>
  </body>
</html>
```

##### Note

`style.css` exposes css via `style` field in `package.json`, if you have another tool for CSS that
identifies this field you can remove the import from `index.html`.

#### Javascript

```js
import "aura-design-system/core/style.css";
import { Section, Button, Input, Icon } from "aura-design-system";
```

#### Theming

```css
*:root {
  --aura-font-stack: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  --aura-snow: #fafafa;
  --aura-purple: #e8ebfe;
  --aura-white: #fff;
  --aura-black: #262626;
  --aura-orange: #feefe8;
  --aura-orange-rose: #fee8ef;
  --aura-pink: #fee8fc;
  --aura-pink-purple: #f3e8fe;
  --aura-blue: #e8f7fe;
  --aura-teal-green: #e8fef7;
  --aura-green: #e8feea;
  --aura-lemon-green: #f3fee8;
  --aura-yellow: #fefbe8;
  --aura-cold-grey: #e8e7ed;
  --aura-base-color: #262626;
  --aura-root: #262626;
  --aura-dark: #fff;
  --aura-realse: #f6f7f9;
}
```

##### Note

You should create a `custom-style.css` and replace the aura tokens for whatever you want.

## Licencia

MIT

## Got feedback?

Please open a new <a href="https://github.com/garitma/aura-design-system/issues">GitHub Issue</a>.
