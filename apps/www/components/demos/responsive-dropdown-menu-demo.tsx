import { Button } from "@/components/ui/Button";
import {
  ResponsiveDropdownMenu,
  ResponsiveDropdownMenuContent,
  ResponsiveDropdownMenuGroup,
  ResponsiveDropdownMenuItem,
  ResponsiveDropdownMenuLabel,
  ResponsiveDropdownMenuSeparator,
  ResponsiveDropdownMenuShortcut,
  ResponsiveDropdownMenuSub,
  ResponsiveDropdownMenuSubContent,
  ResponsiveDropdownMenuSubTrigger,
  ResponsiveDropdownMenuTrigger,
} from "@/components/ui/ResponsiveDropdownMenu";

export const ResponsiveDropdownMenuDemo = () => (
  <ResponsiveDropdownMenu>
    <ResponsiveDropdownMenuTrigger asChild>
      <Button variant="menu">Open menu</Button>
    </ResponsiveDropdownMenuTrigger>
    <ResponsiveDropdownMenuContent
      mobileTitle="Account"
      className="data-[variant=dropdown]:w-20"
    >
      <ResponsiveDropdownMenuLabel>My account</ResponsiveDropdownMenuLabel>
      <ResponsiveDropdownMenuSeparator />
      <ResponsiveDropdownMenuGroup>
        <ResponsiveDropdownMenuItem>
          Profile
          <ResponsiveDropdownMenuShortcut>⇧⌘P</ResponsiveDropdownMenuShortcut>
        </ResponsiveDropdownMenuItem>
        <ResponsiveDropdownMenuItem>Notifications</ResponsiveDropdownMenuItem>
        <ResponsiveDropdownMenuSub>
          <ResponsiveDropdownMenuSubTrigger>
            Share
          </ResponsiveDropdownMenuSubTrigger>
          <ResponsiveDropdownMenuSubContent>
            <ResponsiveDropdownMenuItem>Copy link</ResponsiveDropdownMenuItem>
            <ResponsiveDropdownMenuSub>
              <ResponsiveDropdownMenuSubTrigger>
                Send to team
              </ResponsiveDropdownMenuSubTrigger>
              <ResponsiveDropdownMenuSubContent>
                <ResponsiveDropdownMenuItem>Design</ResponsiveDropdownMenuItem>
                <ResponsiveDropdownMenuItem>
                  Engineering
                </ResponsiveDropdownMenuItem>
              </ResponsiveDropdownMenuSubContent>
            </ResponsiveDropdownMenuSub>
          </ResponsiveDropdownMenuSubContent>
        </ResponsiveDropdownMenuSub>
      </ResponsiveDropdownMenuGroup>
      <ResponsiveDropdownMenuSeparator />
      <ResponsiveDropdownMenuItem>Log out</ResponsiveDropdownMenuItem>
    </ResponsiveDropdownMenuContent>
  </ResponsiveDropdownMenu>
)

export const ResponsiveDropdownMenuDemoCustomBreakpoint = () => (
  <ResponsiveDropdownMenu breakpoint={1024}>
    <ResponsiveDropdownMenuTrigger asChild>
      <Button variant="menu">Breakpoint 1024</Button>
    </ResponsiveDropdownMenuTrigger>
    <ResponsiveDropdownMenuContent mobileTitle="Project actions">
      <ResponsiveDropdownMenuItem>Rename</ResponsiveDropdownMenuItem>
      <ResponsiveDropdownMenuItem>Duplicate</ResponsiveDropdownMenuItem>
      <ResponsiveDropdownMenuItem>Archive</ResponsiveDropdownMenuItem>
    </ResponsiveDropdownMenuContent>
  </ResponsiveDropdownMenu>
)