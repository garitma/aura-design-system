import type { Story } from "@ladle/react";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import AlertDialogModal from "@/components/AlertDialogModal";
import Button from "@/components/ui/Button"; // Assuming Button component exists at this path

export const AlertDialoglDemo: Story = () => {
  const onCancel = () => console.log("Cancel clicked");
  const onAction = () => console.log("Action clicked");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>"Are you absolutely sure?"</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button mode="pill" onClick={onCancel}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onAction}>Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export const AlertDialogModalDemo: Story = () => {
  return (
    <AlertDialogModal
      trigger={<Button>Open Dialog</Button>}
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      actionLabel="Yes, delete account"
      cancelLabel="Cancel"
      onAction={() => console.log("Action confirmed")}
      onCancel={() => console.log("Action cancelled")}
    />
  );
};
