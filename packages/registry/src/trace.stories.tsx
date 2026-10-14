import {
  ArrowTopRightIcon,
  CheckCircledIcon,
  CodeIcon,
  CrossCircledIcon,
  DotFilledIcon,
  FileTextIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  ReaderIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import {
  CodeBlock,
  CodeBlockContent,
} from "../registry/default/components/ui/CodeBlock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../registry/default/components/ui/Dialog";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../registry/default/components/ui/Trace";

export const Default = () => (
  <div className="w-full max-w-lg">
    <Trace>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <ReaderIcon className="icon" />
            </TraceIcon>
            <TraceTitle>Worked for 12s</TraceTitle>
            <TraceDescription>1 command failed</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine status="done">
              <TraceIcon>
                <CheckCircledIcon className="icon" />
              </TraceIcon>
              <TraceTitle>Ran pnpm --version</TraceTitle>
              <TraceDescription>10.2.1</TraceDescription>
            </TraceLine>
            <TraceLine status="error">
              <TraceIcon>
                <CrossCircledIcon className="icon" />
              </TraceIcon>
              <TraceTitle>Failed to run pnpm install --frozen-lockfile</TraceTitle>
            </TraceLine>
            <TraceLine status="running">
              <TraceIcon>
                <SymbolIcon className="icon" />
              </TraceIcon>
              <TraceTitle>Running pnpm install</TraceTitle>
            </TraceLine>
            <TraceLine status="pending">
              <TraceIcon>
                <DotFilledIcon className="icon" />
              </TraceIcon>
              <TraceTitle>Run pnpm test</TraceTitle>
            </TraceLine>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  </div>
);

export const Status = () => (
  <div className="w-full max-w-lg">
    <Trace>
      <TraceLine status="done">
        <TraceIcon>
          <CheckCircledIcon className="icon" />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <CrossCircledIcon className="icon" />
        </TraceIcon>
        <TraceTitle>Failed to run pnpm lint</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <SymbolIcon className="icon" />
        </TraceIcon>
        <TraceTitle>Running pnpm build</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <DotFilledIcon className="icon" />
        </TraceIcon>
        <TraceTitle>Run pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  </div>
);

export const CollapsibleOutput = () => (
  <div className="w-full max-w-lg">
    <Trace>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="done">
            <TraceIcon>
              <CodeIcon className="icon" />
            </TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent>v24.18.0</CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  </div>
);

export const Nested = () => (
  <div className="w-full max-w-lg">
    <Trace>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <MagnifyingGlassIcon className="icon" />
            </TraceIcon>
            <TraceTitle>Used 2 sources</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <GlobeIcon className="icon" />
              </TraceIcon>
              <TraceTitle>pnpm install</TraceTitle>
              <TraceDescription>pnpm.io</TraceDescription>
            </TraceLine>
            <TraceLine>
              <TraceIcon>
                <FileTextIcon className="icon" />
              </TraceIcon>
              <TraceTitle>Read pnpm-lock.yaml</TraceTitle>
            </TraceLine>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  </div>
);

export const Link = () => (
  <div className="w-full max-w-lg">
    <Trace>
      <a href="https://pnpm.io/cli/install">
        <TraceLine>
          <TraceIcon>
            <FileTextIcon className="icon" />
          </TraceIcon>
          <TraceTitle>Read the pnpm install docs</TraceTitle>
        </TraceLine>
      </a>
      <a href="https://pnpm.io" target="_blank" rel="noreferrer">
        <TraceLine>
          <TraceTitle>
            pnpm
            <span className="sr-only">, opens in a new tab</span>
          </TraceTitle>
          <TraceIcon>
            <ArrowTopRightIcon className="icon" />
          </TraceIcon>
        </TraceLine>
      </a>
    </Trace>
  </div>
);

export const DialogStep = () => (
  <div className="w-full max-w-lg">
    <Trace>
      <Dialog>
        <DialogTrigger>
          <TraceLine>
            <TraceIcon>
              <GlobeIcon className="icon" />
            </TraceIcon>
            <TraceTitle>Searched the web for cache keys</TraceTitle>
          </TraceLine>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Searched the web for cache keys</DialogTitle>
            <DialogDescription>
              The frozen install fails because package.json changed without a
              lockfile update.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Trace>
  </div>
);
