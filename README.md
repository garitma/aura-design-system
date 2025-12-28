<p align="center">
  <a href="https://auradesignsystem.com">
    <img src="https://images.prismic.io/garitma/fab89786-299e-4738-aa9e-738b8b29893f_aura-design-system-meditate.png?auto=compress,format?auto=format&w=320" alt="Aura Design System logo" width="300" />
  </a>
</p>

<br>

<p align="center">
  <a href="https://github.com/garitma/aura-design-system/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/garitma/aura-design-system"/>
  </a>
  <a href="https://www.npmjs.com/package/@aura-design/system">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/aura-design"/>
  </a>
  <a href="https://prettier.io">
    <img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"/>
  </a>
</p>

<br />

# Aura Design System

An open-source UI component library for building high-quality, accessible design systems and web apps.

Aura Design System is a space-oriented design system where each object has a halo of light that surrounds it—its aura. You can use these components to build consistent and beautiful interfaces.

## What is Aura Design System?

This is not a component library in the traditional sense. It's a collection of components built from our team's experience, and we are distributing them using the 'shadcn mode'. It was built for our team, but you can use it too.

**What do you mean by not a component library?**

You own the code. You can decide how the components are built and styled. You can copy and paste the code into your project and customize it to your needs. This registry-based approach provides several key advantages:

- **Full Ownership & Control:** Component code lives in your codebase, giving you complete control to modify, adapt, and restyle any component
- **No "Black Box":** You can see exactly what the code is doing, making it easier to debug, customize, and understand
- **Pick What You Need:** Only add the components you are actively using, preventing bloat
- **Framework Agnostic:** Components are designed to be copied and pasted, not tied to specific library versions
- **Easy Updates:** The CLI tool makes it easy to check for updates and decide whether to incorporate them

## Quick Start

To install, simply run the Aura Design CLI:

```bash
pnpm dlx @aura-design/cli@latest init
```

This command will automatically execute the original shadcn/ui CLI under the hood, and then apply all necessary tokens and configuration fixtures specific to the Aura Design System. You don't need to manually configure anything — just run the command and your project will be set up with Aura's tokens and settings seamlessly.

To add individual components:

```bash
pnpm dlx shadcn@latest add @aura/button
```

If you want to install all available Aura components in one shot, you can use the list at [https://auradesignsystem.com/all.txt](https://auradesignsystem.com/all.txt).

## Design Tokens

Aura uses a unique design token system:

- **Spacing:** A unit of space is 13px, with tokens defined in increments of 1 or 0.5 units (1 = 13px, 1.5 = 19.5px, 2 = 26px, etc.)
- **Colors:** Custom color palette system with accent and gray scales, supporting both light and dark modes
- **Typography:** Responsive typography using CSS `clamp()` for fluid scaling across all devices

## Documentation

For full documentation, visit [auradesignsystem.com](https://auradesignsystem.com/).

Key topics:
- [Introduction](https://auradesignsystem.com/docs) - Philosophy and approach
- [Installation](https://auradesignsystem.com/docs/installation) - Get started guide
- [Registry](https://auradesignsystem.com/docs/registry) - Understanding the registry-based approach
- [Taste](https://auradesignsystem.com/docs/taste) - Design tokens for spacing, colors, and typography
- [Namespace](https://auradesignsystem.com/docs/namespace) - Managing components from multiple registries
- [Components](https://auradesignsystem.com/docs/components) - Component documentation

## Releases

For changelog, visit [github.com/garitma/aura-design-system/releases](https://github.com/garitma/aura-design-system/releases).

## Community

- [GitHub Issues](https://github.com/garitma/aura-design-system/issues) - To report bugs or request features.

## License

Licensed under the [MIT License](LICENSE), Copyright © 2025-present Garitma.
