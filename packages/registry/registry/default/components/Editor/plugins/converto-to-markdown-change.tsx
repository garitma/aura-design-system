"use client"
import { $convertToMarkdownString, CHECK_LIST, ELEMENT_TRANSFORMERS, MULTILINE_ELEMENT_TRANSFORMERS, TEXT_FORMAT_TRANSFORMERS, TEXT_MATCH_TRANSFORMERS, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { HR } from "../transformers/markdown-hr-transformer";
import { IMAGE } from "../transformers/markdown-image-transformer";

export function ConverToMarkdownChangePlugin({ onChange }: { onChange: (state: any) => void }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                let markdown = $convertToMarkdownString([
                    HR,
                    IMAGE,
                    CHECK_LIST,
                    ...ELEMENT_TRANSFORMERS,
                    ...MULTILINE_ELEMENT_TRANSFORMERS,
                    ...TEXT_FORMAT_TRANSFORMERS,
                    ...TEXT_MATCH_TRANSFORMERS,
                ], undefined, false);

                if(markdown.startsWith("```markdown")) {
                    markdown = markdown.slice(11);
                }
                if(markdown.endsWith("```")) {
                    markdown = markdown.slice(0, -3);
                }
                onChange(markdown);
            });
        });
    }, [editor, onChange]);

    return null;
}