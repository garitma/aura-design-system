import { Kbd, KbdGroup } from "@/components/ui/Kbd";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

export const KbdDemo = () => <Kbd>⌘</Kbd>;

export const KbdDemoSingleKey = () => (
  <div className="flex gap-2 items-center">
    <Kbd>A</Kbd>
    <Kbd>B</Kbd>
    <Kbd>C</Kbd>
    <Kbd>Enter</Kbd>
    <Kbd>Esc</Kbd>
  </div>
);

export const KbdDemoModifierKeys = () => (
  <div className="flex gap-2 items-center">
    <Kbd>⌘</Kbd>
    <Kbd>⌥</Kbd>
    <Kbd>⌃</Kbd>
    <Kbd>⇧</Kbd>
  </div>
);

export const KbdDemoKeyboardShortcuts = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <span>Copy:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2">
      <span>Paste:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>V</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2">
      <span>Save:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>S</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2">
      <span>Undo:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>Z</Kbd>
      </KbdGroup>
    </div>
  </div>
);

export const KbdDemoWithIcons = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <span>Navigate up:</span>
      <Kbd>
        <ArrowUpIcon />
      </Kbd>
    </div>
    <div className="flex items-center gap-2">
      <span>Navigate down:</span>
      <Kbd>
        <ArrowDownIcon />
      </Kbd>
    </div>
    <div className="flex items-center gap-2">
      <span>Navigate:</span>
      <KbdGroup>
        <Kbd>
          <ArrowUpIcon />
        </Kbd>
        <Kbd>
          <ArrowDownIcon />
        </Kbd>
      </KbdGroup>
    </div>
  </div>
);

export const KbdDemoComplexShortcuts = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <span>Command Palette:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2">
      <span>Close Tab:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>W</Kbd>
      </KbdGroup>
    </div>
    <div className="flex items-center gap-2">
      <span>New Tab:</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>T</Kbd>
      </KbdGroup>
    </div>
  </div>
);

export const KbdDemoGroup = () => (
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
);