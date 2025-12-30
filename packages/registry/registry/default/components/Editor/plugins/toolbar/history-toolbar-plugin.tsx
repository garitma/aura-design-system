"use client"

import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { ResetIcon} from "@radix-ui/react-icons"

import { useToolbarContext } from "@/components/Editor/context/toolbar-context"
import { Button } from "@/components/ui/Button"
import { ButtonGroup } from "@/components/ui/button-group"

export function HistoryToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const { activeEditor, $updateToolbar } = useToolbarContext()
  const [isEditable, setIsEditable] = useState(editor.isEditable())
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [$updateToolbar, activeEditor, editor])

  return (
    <ButtonGroup>
      <Button
        isDisabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        type="button"
        aria-label="Undo"
        size="icon"
        mode="pill"
      >
        <ResetIcon className="icon" />
      </Button>
      <Button
        isDisabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        type="button"
        aria-label="Redo"
        size="icon"
        mode="pill"
      >
        <ResetIcon className="icon -scale-x-100"  />
      </Button>
    </ButtonGroup>
  )
}
