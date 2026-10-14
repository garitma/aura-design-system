import { useEffect } from "react"
import {
  $getSelection,
  BaseSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical"

import { useToolbarContext } from "@/components/Editor/context/toolbar-context"

export function useUpdateToolbarHandler(
  callback: (selection: BaseSelection) => void
) {
  const { activeEditor } = useToolbarContext()

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection()
        if (selection) {
          callback(selection)
        }
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [activeEditor, callback])

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      const selection = $getSelection()
      if (selection) {
        callback(selection)
      }
    })
  }, [activeEditor, callback])
}
