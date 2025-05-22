import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import DialogModal from "@/components/DialogModal";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="smash">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogModalDemo() {
  return (
    <DialogModal
      trigger={<Button>Edit Profile</Button>}
      title="Edit profile"
      description=" Make changes to your profile here. Click save when you're done."
      footer={
        <DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogClose>
      }
    ></DialogModal>
  );
}

export function DialogModalControlledDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const HandleOnSubmit = () => {
    setIsOpen(false);
  };
  
  return (
    <DialogModal
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={<Button>Edit Profile</Button>}
      title="Edit profile"
      description=" Make changes to your profile here. Click save when you're done."
      footer={
        <Button type="submit" onClick={HandleOnSubmit}>
          Save changes
        </Button>
      }
    ></DialogModal>
  );
}
