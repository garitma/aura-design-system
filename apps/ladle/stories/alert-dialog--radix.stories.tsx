import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "@aura-design/system/button";

import CommandLine from "../components/CommandLine";

export default {
  title: "Alert Dialog",
};

export const AlertDialogDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Button>Delete account</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
      <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2">
        <AlertDialog.Title className="m-0">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 mt-1.5 leading-normal">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-2">
          <AlertDialog.Cancel asChild>
            <Button mode="link">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button mode="fill">Yes, delete account</Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

AlertDialogDemo.decorators = [
  (Component) => (
    <>
      <CommandLine code="pnpm i @radix-ui/react-alert-dialog" />
      <Component />
    </>
  ),
];
