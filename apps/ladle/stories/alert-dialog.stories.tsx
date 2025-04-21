import React from "react";
import type { Story } from "@ladle/react";

import AlertDialog from "@/components/ui/alert-dialog";

export const Default: Story = () => {
  return (
    <AlertDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      triggerButton={{ label: "Delete account" }}
      cancelButton={{ label: "Cancel" }}
      actionButton={{ label: "Yes, delete account" }}
    />
  );
};
