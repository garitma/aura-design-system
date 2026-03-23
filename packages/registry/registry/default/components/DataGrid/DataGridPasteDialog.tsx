"use client";

import type { TableMeta } from "@tanstack/react-table";
import * as React from "react";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Form, FormRadioGroup } from "@/components/ui/Form";
import { useAsRef } from "@/hooks/use-as-ref";
import { useFormDynamic } from "@/hooks/use-dynamic-form";
import type { PasteDialogState } from "./types";

interface DataGridPasteDialogProps<TData> {
  tableMeta: TableMeta<TData>;
  pasteDialog: PasteDialogState;
}

export function DataGridPasteDialog<TData>({
  tableMeta,
  pasteDialog,
}: DataGridPasteDialogProps<TData>) {
  const onPasteDialogOpenChange = tableMeta?.onPasteDialogOpenChange;
  const onCellsPaste = tableMeta?.onCellsPaste;

  if (!pasteDialog.open) return null;

  return (
    <PasteDialog
      pasteDialog={pasteDialog}
      onPasteDialogOpenChange={onPasteDialogOpenChange}
      onCellsPaste={onCellsPaste}
    />
  );
}

interface PasteDialogProps
  extends Pick<TableMeta<unknown>, "onPasteDialogOpenChange" | "onCellsPaste">,
    Required<Pick<TableMeta<unknown>, "pasteDialog">> {}

const PasteDialog = React.memo(PasteDialogImpl, (prev, next) => {
  if (prev.pasteDialog.open !== next.pasteDialog.open) return false;
  if (!next.pasteDialog.open) return true;
  if (prev.pasteDialog.rowsNeeded !== next.pasteDialog.rowsNeeded) return false;

  return true;
});

const FORM_ID = "data-grid-paste-form";

function PasteDialogImpl({
  pasteDialog,
  onPasteDialogOpenChange,
  onCellsPaste,
}: PasteDialogProps) {
  const propsRef = useAsRef({
    onPasteDialogOpenChange,
    onCellsPaste,
  });

  const formRef = React.useRef<HTMLFormElement>(null);
  const formData = useFormDynamic({ pasteMode: "select" }, formRef);
  const { pasteMode } = formData.getFields();
  const formDataRef = useAsRef(formData);

  React.useLayoutEffect(() => {
    if (pasteDialog.open) {
      formDataRef.current.field("pasteMode").setValue("expand");
    }
  }, [pasteDialog.open, formDataRef]);

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      propsRef.current.onPasteDialogOpenChange?.(open);
    },
    [propsRef],
  );

  const onCancel = React.useCallback(() => {
    propsRef.current.onPasteDialogOpenChange?.(false);
  }, [propsRef]);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const mode = formData.getValues().pasteMode;
      const expand = mode === "expand";
      propsRef.current.onCellsPaste?.(expand);
    },
    [formData, propsRef],
  );

  const rowsWord = pasteDialog.rowsNeeded !== 1 ? "s" : "";

  return (
    <Dialog open={pasteDialog.open} onOpenChange={onOpenChange}>
      <DialogContent data-grid-popover="">
        <Form
          ref={formRef}
          id={FORM_ID}
          onSubmit={onSubmit}
          className="contents"
        >
          <DialogHeader>
            <DialogTitle className="h4 text-gray-12">
              Do you want to add more rows?
            </DialogTitle>
            <DialogDescription className="p text-gray-11">
              We need{" "}
              <span className="font-medium text-gray-12">
                {pasteDialog.rowsNeeded}
              </span>{" "}
              additional row{rowsWord} to paste everything from your clipboard.
            </DialogDescription>
          </DialogHeader>
          <FormRadioGroup
            name="pasteMode"
            field={pasteMode}
            className="flex flex-col gap-1 py-1"
            options={[
              {
                value: "expand",
                label: "Create new rows",
                description: `Add ${pasteDialog.rowsNeeded} new row${rowsWord} to the table and paste all data`,
              },
              {
                value: "no-expand",
                label: "Keep current rows",
                description:
                  "Paste only what fits in the existing rows",
              },
            ]}
          />
          <DialogFooter>
            <Button type="button" mode="pill" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" form={FORM_ID}>
              Continue
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
