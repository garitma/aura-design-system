"use client"

import { useState } from "react"
import { $isTableSelection } from "@lexical/table"
import {
  $isRangeSelection,
  BaseSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical"
import {
  FontBoldIcon,
  CodeIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"

import { useToolbarContext } from "@/components/Editor/context/toolbar-context"
import { useUpdateToolbarHandler } from "@/components/Editor/editor-hooks/use-update-toolbar"
import { Toggle } from "@/components/ui/Toggle"

const Icons: Partial<Record<TextFormatType, React.ElementType>> = {
  bold: FontBoldIcon,
  italic: FontItalicIcon,
  underline: UnderlineIcon,
  strikethrough: StrikethroughIcon,
  code: CodeIcon,
} as const

export function FontFormatToolbarPlugin({
  format,
}: {
  format: Omit<TextFormatType, "highlight" | "subscript" | "superscript">
}) {
  const { activeEditor } = useToolbarContext()
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // @ts-ignore
      setIsSelected(selection.hasFormat(format as TextFormatType))
    }
  }

  useUpdateToolbarHandler($updateToolbar)

  const Icon = Icons[format as TextFormatType] as React.ElementType

  return (
    <Toggle
      aria-label="Toggle bold"

      defaultPressed={isSelected}
      pressed={isSelected}
      onPressedChange={setIsSelected}
      onClick={() => {
        activeEditor.dispatchCommand(
          FORMAT_TEXT_COMMAND,
          format as TextFormatType
        )
      }}
    >
      <Icon className="icon" />
    </Toggle>
  )
}
