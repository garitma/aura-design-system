import React from "react";
import type { Story } from "@ladle/react";

import Alert from "@/registry/default/ui/alert";

export const Info: Story = () => (
  <Alert
    status="info"
    label="This is an informational message providing helpful details about a feature
    or process. Please review this information carefully."
  />
);

export const Success: Story = () => (
  <Alert
    status="success"
    label="Operation completed successfully! Your changes have been saved and all processes
    finished as expected. You can continue with your work."
  />
);

export const Warning: Story = () => (
  <Alert
    status="warning"
    label="Please proceed with caution. This action may have unexpected consequences
    and should be reviewed carefully before continuing."
  />
);

export const Danger: Story = () => (
  <Alert
    status="danger"
    label=" Critical error detected! This operation cannot be completed and immediate
    attention is required. Please contact system administrator."
  />
);

export const NoStatus: Story = () => (
  <Alert
    label="This is a neutral message that doesn't fit into the other alert categories
    but still contains important information to convey."
  />
);

export const NoIcon: Story = () => (
  <Alert
    label="This is a neutral message that doesn't fit into the other alert categories
      but still contains important information to convey."
    showIcon={false}
  />
);
