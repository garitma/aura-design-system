import {
  CopyIcon,
  EyeNoneIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Kbd } from "@/components/ui/Kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/InputGroup";

export const InputGroupDemo = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <MagnifyingGlassIcon className="icon" />
      </InputGroupAddon>
    </InputGroup>
  </div>
)

export const InputGroupDemoInlineEnd = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <InputGroup>
      <InputGroupInput type="password" placeholder="Password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Hide password">
          <EyeNoneIcon className="icon" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

export const InputGroupDemoText = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

export const InputGroupDemoWithKbd = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <InputGroup>
      <InputGroupInput placeholder="Search documentation..." />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

export const InputGroupDemoBlockStart = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <InputGroup>
      <InputGroupInput placeholder="package.json" />
      <InputGroupAddon align="block-start" className="border-b border-gray-6">
        <InputGroupText>File</InputGroupText>
        <InputGroupButton size="icon-xs" aria-label="Copy" className="ml-auto">
          <CopyIcon className="icon" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

export const InputGroupDemoTextareaWithFooter = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <InputGroup>
      <InputGroupTextarea placeholder="Write a message..." />
      <InputGroupAddon align="block-end" className="border-t border-gray-6">
        <InputGroupText>0/240</InputGroupText>
        <InputGroupButton variant="fill" size="xs" className="ml-auto">
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
)