<p align="center">
  <a href="https://auradesignsystem">
    <img src="https://images.prismic.io/garitma/fab89786-299e-4738-aa9e-738b8b29893f_aura-design-system-meditate.png?auto=compress,format?auto=format&w=320" alt="Aura Desing System logo" width="300" />
  </a>
</p>

<br>

<p align="center">
  <img alt="Bundle Size" src="https://img.shields.io/bundlephobia/minzip/aura-design-system"/>
  <img alt="MIT License" src="https://img.shields.io/github/license/garitma/aura-design-system"/>
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/aura-design-system"/>
  <img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"/>
</p>
<br />

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
```

#### Theming

```css
*:root {
  -aura-font-stack: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
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
  --aura-grey: #f6f7f9;
  --aura-bg: var(--aura-white);
  --aura-accents-0: var(--aura-black);
  --aura-accents-1: var(--aura-cold-grey);
  --aura-accents-2: var(--aura-grey);
  --aura-dark: var(--aura-white);
  --aura-accents-primary: var(--aura-black);
  --aura-accents-secondary: #0882ba;
  --aura-accents-success: #08ba82;
  --aura-accents-success-bg: var(--aura-teal-green);
  --aura-accents-info: #8b9afa;
  --aura-accents-info-bg: var(--aura-purple);
  --aura-accents-warning: #baa208;
  --aura-accents-warning-bg: var(--aura-yellow);
  --aura-accents-danger: #ba4108;
  --aura-accents-danger-bg: var(--aura-orange);
  --aura-accents-radius: var(--aura-radius);
  --aura-input-radius: var(--aura-radius);
  --aura-button-radius: var(--aura-radius);
  --aura-input-bg: var(--aura-grey);
  --aura-input-placeholder-color: rgba(38, 38, 38, 0.2);
  --aura-radius: 13px;
  --aura-link-color: var(--aura-fg);
  --aura-opacity: 0.5;
}
```

##### Note

You should create a `custom-style.css` and replace the aura tokens for whatever you want.

## License

MIT

## Got feedback?

Please open a new <a href="https://github.com/garitma/aura-design-system/issues">GitHub Issue</a>.
