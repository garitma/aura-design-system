"use client";

import { ImageIcon } from "@radix-ui/react-icons";

import { useToolbarContext } from "../../context/toolbar-context";
import { InsertImageDialog } from "../images-plugin";
import Button from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <Button
      mode="pill"
      onClick={(e) => {
        showModal("Insertar imagen", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ));
      }}
      size="icon"
      aria-label="Insert image"
    >
      <ImageIcon className="icon" />
    </Button>
  );
}
