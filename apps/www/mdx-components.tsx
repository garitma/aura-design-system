import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  createGenerator,
  createFileSystemGeneratorCache,
} from 'fumadocs-typescript';

import { CodeBlock } from "@/components/ui/Codeblock";
import { ComponentSource } from "@/components/ComponentSource";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "@/components/ui/Heading";
import { Steps, Step } from "fumadocs-ui/components/steps";


// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    pre: CodeBlock,
    ComponentSource,
    Steps,
    Step,
  };
}
