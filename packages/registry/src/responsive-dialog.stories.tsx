import { Button } from "../registry/default/components/ui/Button";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "../registry/default/components/ui/ResponsiveDialog";

export const Default = () => (
  <ResponsiveDialog>
    <ResponsiveDialogTrigger asChild>
      <Button variant="pill">Open</Button>
    </ResponsiveDialogTrigger>
    <ResponsiveDialogContent className="data-[variant=dialog]:max-w-md">
      <ResponsiveDialogHeader>
        <ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
        <ResponsiveDialogDescription>
          Dialog on desktop, drawer on mobile. Resize the viewport to switch.
        </ResponsiveDialogDescription>
      </ResponsiveDialogHeader>
      <p className="text-sm text-gray-11 p-1">
        Use <code className="text-xs">data-variant</code> to style each surface.
      </p>
      <ResponsiveDialogFooter className="gap-1 p-1">
        <ResponsiveDialogClose asChild>
          <Button variant="pill">Cancel</Button>
        </ResponsiveDialogClose>
        <Button variant="fill">Save</Button>
      </ResponsiveDialogFooter>
    </ResponsiveDialogContent>
  </ResponsiveDialog>
);

export const Confirmation = () => (
  <ResponsiveDialog>
    <ResponsiveDialogTrigger asChild>
      <Button variant="pill">Delete project</Button>
    </ResponsiveDialogTrigger>
    <ResponsiveDialogContent className="data-[variant=dialog]:max-w-sm">
      <ResponsiveDialogHeader>
        <ResponsiveDialogTitle>Delete this project?</ResponsiveDialogTitle>
        <ResponsiveDialogDescription>
          This action cannot be undone. The project and its resources will be
          permanently removed.
        </ResponsiveDialogDescription>
      </ResponsiveDialogHeader>
      <ResponsiveDialogFooter className="gap-1 p-1 data-[variant=drawer]:flex-col data-[variant=dialog]:flex-row data-[variant=dialog]:justify-end">
        <ResponsiveDialogClose asChild>
          <Button variant="pill">Cancel</Button>
        </ResponsiveDialogClose>
        <ResponsiveDialogClose asChild>
          <Button variant="fill">Delete</Button>
        </ResponsiveDialogClose>
      </ResponsiveDialogFooter>
    </ResponsiveDialogContent>
  </ResponsiveDialog>
);

export const CustomBreakpoint = () => (
  <ResponsiveDialog breakpoint={1024}>
    <ResponsiveDialogTrigger asChild>
      <Button variant="pill">Breakpoint 1024</Button>
    </ResponsiveDialogTrigger>
    <ResponsiveDialogContent>
      <ResponsiveDialogHeader>
        <ResponsiveDialogTitle>Custom breakpoint</ResponsiveDialogTitle>
        <ResponsiveDialogDescription>
          Switches to drawer below 1024px instead of the default 768px.
        </ResponsiveDialogDescription>
      </ResponsiveDialogHeader>
      <ResponsiveDialogFooter className="p-1">
        <ResponsiveDialogClose asChild>
          <Button variant="fill">Got it</Button>
        </ResponsiveDialogClose>
      </ResponsiveDialogFooter>
    </ResponsiveDialogContent>
  </ResponsiveDialog>
);
