"use client";

import { useId } from "react";
import { LexicalEditor } from "lexical";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import {
  $convertFromMarkdownString,
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
  TRANSFORMERS,
} from "@lexical/markdown";

import { editorTheme } from "@/components/Editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { HR } from "@/components/Editor/transformers/markdown-hr-transformer";
import { IMAGE } from "@/components/Editor/transformers/markdown-image-transformer";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";

export function Editor({
  editorState,
  onChange,
}: {
  editorState?: string;
  onChange?: (editorState: any) => void;
}) {
  const editorId = useId();
  
  const editorConfig: InitialConfigType = {
    namespace: `Editor-${editorId}`,
    theme: editorTheme,
    nodes,
    onError: (error: Error) => {
      console.error("Error in editor", error);
    },
  };

  return (
    <div className="bg-gray-2 border border-gray-6 rounded-md">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: (editor: LexicalEditor) => {
            editor.update(() => {
              if (!editorState) return;
              $convertFromMarkdownString(
                editorState,
                [HR, IMAGE, CHECK_LIST, ...TRANSFORMERS],
                undefined,
                true
              );
            });
          },
        }}
      >
        <TooltipProvider>
          <Plugins onChange={onChange} />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
