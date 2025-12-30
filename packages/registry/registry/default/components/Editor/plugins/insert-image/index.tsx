"use client";

import { ImageIcon } from "lucide-react";

import { useToolbarContext } from "../../context/toolbar-context";
import { InsertImageDialog } from "../images-plugin";
import Button from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <button
      onClick={(e) => {
        showModal("Insertar imagen", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ));
      }}
      className="h-2 px-1.5 min-w-2"
    >
      <ImageIcon className="size-1.5" />
    </button>
  );
}
