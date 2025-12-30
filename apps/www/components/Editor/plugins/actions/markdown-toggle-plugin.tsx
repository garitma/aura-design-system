"use client"

import { useCallback, useEffect, useState } from "react"
import { $createCodeNode, $isCodeNode } from "@lexical/code"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  Transformer,
} from "@lexical/markdown"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createTextNode, $getRoot } from "lexical"
import { PlayIcon } from "@radix-ui/react-icons"

import Button from "@/components/ui/Button"

export function MarkdownTogglePlugin({
  shouldPreserveNewLinesInMarkdown,
  transformers,
}: {
  shouldPreserveNewLinesInMarkdown: boolean
  transformers: Array<Transformer>
}) {
  const [editor] = useLexicalComposerContext()
  const [isMarkdownActive, setIsMarkdownActive] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot()
        const firstChild = root.getFirstChild()
        setIsMarkdownActive(
          $isCodeNode(firstChild) && firstChild.getLanguage() === "markdown"
        )
      })
    })
  }, [editor])

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot()
      const firstChild = root.getFirstChild()
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          transformers,
          undefined, // node
          shouldPreserveNewLinesInMarkdown
        )
      } else {
        const markdown = $convertToMarkdownString(
          transformers,
          undefined, //node
          shouldPreserveNewLinesInMarkdown
        )
        const codeNode = $createCodeNode("markdown")
        codeNode.append($createTextNode(markdown))
        root.clear().append(codeNode)
        if (markdown.length === 0) {
          codeNode.select()
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, shouldPreserveNewLinesInMarkdown])

  return (
    <Button
      mode="pill"
      size="icon"
      onClick={handleMarkdownToggle}
      className={`bg-gray-2 border border-gray-6 ${isMarkdownActive ? "text-gray-11" : "text-gray-12"}`}
      aria-label="Convert from markdown"
    >
      <PlayIcon className="icon" />
    </Button>
  )
}
