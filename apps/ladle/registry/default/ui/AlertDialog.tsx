import { ReactNode } from "react";
import { AlertDialog as AlertDialogRadix } from "radix-ui";

import Button, { ButtonProps } from "@/components/ui/Button";

/**
 * Props for the AlertDialog component
 */
type AlertDialogProps = {
  /** Content for the dialog title */
  title?: ReactNode;
  /** Content for the dialog description */
  description?: ReactNode;
  /** Props for the trigger button */
  triggerButton?: ButtonProps;
  /** Props for the cancel button */
  cancelButton?: ButtonProps;
  /** Props for the action button */
  actionButton?: ButtonProps;
  /** Props for the AlertDialog trigger element */
  triggerProps?: AlertDialogRadix.AlertDialogTriggerProps;
  /** Props for the AlertDialog overlay */
  overlayProps?: AlertDialogRadix.AlertDialogOverlayProps;
  /** Props for the AlertDialog content container */
  contentProps?: AlertDialogRadix.AlertDialogContentProps;
  /** Props for the AlertDialog title element */
  titleProps?: AlertDialogRadix.AlertDialogTitleProps;
  /** Props for the AlertDialog description element */
  descriptionProps?: AlertDialogRadix.AlertDialogDescriptionProps;
  /** Props for the AlertDialog action button wrapper */
  actionProps?: AlertDialogRadix.AlertDialogActionProps;
  /** Props for the AlertDialog cancel button wrapper */
  cancelProps?: AlertDialogRadix.AlertDialogCancelProps;
  /** Props for the AlertDialog portal */
  portalProps?: AlertDialogRadix.AlertDialogPortalProps;
  /** Props for the AlertDialog root element */
  rootProps?: AlertDialogRadix.AlertDialogProps;
};

/**
 * A modal dialog that interrupts the user with important content and expects a response
 * Built on top of Radix UI's AlertDialog primitive
 */
const AlertDialog = ({
  title,
  description,
  triggerProps,
  triggerButton,
  cancelButton,
  actionButton,
  overlayProps,
  contentProps,
  titleProps,
  descriptionProps,
  actionProps,
  cancelProps,
  portalProps,
  rootProps,
}: AlertDialogProps) => (
  <AlertDialogRadix.Root {...rootProps}>
    {/* Button that triggers the dialog */}
    <AlertDialogRadix.Trigger asChild {...triggerProps}>
      <Button {...triggerButton} />
    </AlertDialogRadix.Trigger>
    <AlertDialogRadix.Portal {...portalProps}>
      {/* Semi-transparent overlay behind the dialog */}
      <AlertDialogRadix.Overlay
        className="fixed inset-0 bg-black-a8 z-10"
        {...overlayProps}
      />
      {/* Main dialog content container */}
      <AlertDialogRadix.Content
        className="smash fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-black-1 p-2 rounded-1 z-10 data-[state=open]:animate-content-show"
        {...contentProps}
      >
        <AlertDialogRadix.Title className="m-0" {...titleProps}>
          {title}
        </AlertDialogRadix.Title>
        <AlertDialogRadix.Description {...descriptionProps}>
          {description}
        </AlertDialogRadix.Description>
        {/* Container for action buttons */}
        <div
          className="flex-col-reverse md:flex-row flex justify-end gap-1 md:gap-2"
          data-display-name="div"
        >
          <AlertDialogRadix.Cancel asChild {...cancelProps}>
            <Button {...cancelButton} mode="pill" />
          </AlertDialogRadix.Cancel>
          <AlertDialogRadix.Action asChild {...actionProps}>
            <Button {...actionButton} />
          </AlertDialogRadix.Action>
        </div>
      </AlertDialogRadix.Content>
    </AlertDialogRadix.Portal>
  </AlertDialogRadix.Root>
);

export default AlertDialog;
