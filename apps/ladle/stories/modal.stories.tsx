import React, { useState } from "react";

import Button from "@aura-design/ui/button";
import Modal from "@aura-design/ui/modal";

export const DefaultConfig = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} label="Delete Account" />
      <Modal
        isVisible={isOpen}
        title="Are you absolutely sure?"
        firstButton={{
          label: "Cancel",
          onClick: () => setIsOpen(false),
        }}
        secondButton={{
          label: "Yes, delete account",
          onClick: () => setIsOpen(false),
        }}
        onClose={() => setIsOpen(false)}
      >
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Modal>
    </>
  );
};
