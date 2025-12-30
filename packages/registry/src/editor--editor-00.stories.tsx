
import type { Story } from "@ladle/react";
import { Editor } from "../registry/default/components/blocks/editor-00/editor";


export const EditorWithInitialContent: Story = () => {
  const initialContent = `# Welcome to the Editor

This is a **rich text editor** built with Lexical.

## Features

- *Italic* text
- **Bold** text
- ~~Strikethrough~~ text
- [Links](https://example.com)
- Lists (ordered and unordered)
- Headings
- Quotes

> This is a blockquote

1. First item
2. Second item
3. Third item

- Unordered item
- Another item
`;

  return <Editor editorState={initialContent} />;
};
