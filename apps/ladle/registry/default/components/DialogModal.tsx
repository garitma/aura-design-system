import { AuraContainer } from "@aura-design/system/types/global";

import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

interface DialogModalProps {
  trigger: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  container: AuraContainer;
  footer: React.ReactNode;
  children: React.ReactNode;
}

function DialogModal({
  title,
  description,
  trigger,
  container = "smash",
  footer,
  children,
}: DialogModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(container)}>
        {title || description ? (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        ) : null}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export default DialogModal;
