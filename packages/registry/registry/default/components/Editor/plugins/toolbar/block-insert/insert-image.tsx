"use client"

import { ImageIcon } from "@radix-ui/react-icons"

import { useToolbarContext } from "@/components/Editor/context/toolbar-context"
import { InsertImageDialog } from "@/components/Editor/plugins/images-plugin"
import { SelectItem } from "@/components/ui/select"

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext()

  return (
    <SelectItem
      value="image"
      onPointerUp={(e) => {
        showModal("Insert Image", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }}
      className=""
    >
      <div className="flex items-center gap-1">
        <ImageIcon className="icon" />
        <span>Image</span>
      </div>
    </SelectItem>
  )
}
