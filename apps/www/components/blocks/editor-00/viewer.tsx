"use client"

import { useId, useState } from "react"
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin"
import { $convertFromMarkdownString, CHECK_LIST, TRANSFORMERS } from "@lexical/markdown"
import { LexicalEditor } from "lexical"
import { PlayIcon } from "@radix-ui/react-icons"

import { editorTheme } from "@/components/Editor/themes/editor-theme"
import { nodes } from "./nodes"
import { HR } from "@/components/Editor/transformers/markdown-hr-transformer"
import { IMAGE } from "@/components/Editor/transformers/markdown-image-transformer"
import Button from "@/components/ui/Button"
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea"

export function Viewer({ content, height }: { content: string, height?: string }) {
  const viewerId = useId();
  
  const viewerConfig: InitialConfigType = {
    namespace: `Viewer-${viewerId}`,
    theme: editorTheme,
    nodes,
    editable: false,
    onError: (error: Error) => {
      console.error("Error in viewer", error)
    },
  };
  const [isMarkdownView, setIsMarkdownView] = useState(false)

  if (isMarkdownView) {
    return (
      <div className="bg-gray-2 border border-gray-6 rounded-sm p-1 cursor-default">
        <div className="flex justify-end items-center mb-0.5 pb-0.5 border-b border-gray-6">
        
          <Button
            mode="pill"
            onClick={() => setIsMarkdownView(false)}
            className={`bg-gray-2 border border-gray-6 text-gray-12 size-3`}

          >
            <PlayIcon className="icon" />
          </Button>
        </div>
        <ScrollArea className="w-full rounded-sm" style={{ height: height || '400px' }}>
          <pre className="text-gray-12 bg-gray-1 border border-gray-6 p-1 rounded-sm max-w-full">
            <code className="text-sm font-mono whitespace-pre-wrap break-words cursor-text">
              {content}
            </code>
          </pre>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="bg-gray-2 border border-gray-6 rounded-sm p-1 cursor-default">
      <div className="flex justify-end items-center mb-0.5 pb-0.5 border-b border-gray-6">
        <Button
          mode="pill"
          onClick={() => setIsMarkdownView(true)}
          className={`bg-gray-2 border border-gray-6 text-gray-12 size-3`}
        >
          <PlayIcon className="icon" />
        </Button>
      </div>
      <LexicalComposer
        initialConfig={{
          ...viewerConfig,
          editorState: (editor: LexicalEditor) => {
            editor.update(() => {
              if (!content) return
              $convertFromMarkdownString(
                content,
                [HR, IMAGE, CHECK_LIST, ...TRANSFORMERS],
                undefined,
                true
              )
            })
          },
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ScrollArea className="w-full rounded-sm" style={{ height: height || '400px' }}>
              <div className="px-1">
                <ContentEditable className="outline-none text-gray-12 cursor-default" />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          }
          placeholder={
            <div className="text-gray-11 absolute top-1 left-1 pointer-events-none select-none">
              No content available
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <ClickableLinkPlugin />
      </LexicalComposer>
    </div>
  )
}

