import * as React from "react";
import { AlertDialog } from "radix-ui";
import Button from "@/components/ui/Button";

export const importString =
  "import { AlertDialog } from 'radix-ui';\nimport Button from '@/components/ui/Button';";

const Component = () => (
  <AlertDialog.Root data-display-name="AlertDialog.Root">
    <AlertDialog.Trigger asChild data-display-name="AlertDialog.Trigger">
      <Button data-display-name="Button">Delete account</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal data-display-name="AlertDialog.Portal">
      <AlertDialog.Overlay
        className="fixed inset-0 bg-black-a10 z-10 data-[state=open]:animate-overlay-show"
        data-display-name="AlertDialog.Overlay"
      />
      <AlertDialog.Content
        className="smash fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-black-1 p-2 rounded-1 z-10 data-[state=open]:animate-content-show"
        data-display-name="AlertDialog.Content"
      >
        <AlertDialog.Title
          className="m-0"
          data-display-name="AlertDialog.Title"
        >
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description data-display-name="AlertDialog.Description">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-2" data-display-name="div">
          <AlertDialog.Cancel asChild data-display-name="AlertDialog.Cancel">
            <Button mode="link" data-display-name="Button">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild data-display-name="AlertDialog.Action">
            <Button data-display-name="Button">Yes, delete account</Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default Component;
