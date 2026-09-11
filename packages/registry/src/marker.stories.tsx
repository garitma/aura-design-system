import {
  CheckCircledIcon,
  FileTextIcon,
  GitHubLogoIcon,
  MagnifyingGlassIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "../registry/default/components/ui/Marker";

export const Default = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker>
      <MarkerIcon>
        <GitHubLogoIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker role="status">
      <MarkerContent>Thinking...</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <MagnifyingGlassIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  </div>
);

export const Variants = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker>
      <MarkerContent>A default marker for inline notes.</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>A separator marker</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerContent>A border marker for row boundaries.</MarkerContent>
    </Marker>
  </div>
);

export const Status = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker role="status">
      <MarkerIcon>
        <SymbolIcon className="icon animate-spin" />
      </MarkerIcon>
      <MarkerContent>Compacting conversation</MarkerContent>
    </Marker>
    <Marker role="status">
      <MarkerIcon>
        <SymbolIcon className="icon animate-spin" />
      </MarkerIcon>
      <MarkerContent>Running tests</MarkerContent>
    </Marker>
  </div>
);

export const Separator = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker variant="separator">
      <MarkerContent>Today</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Worked for 42s</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
  </div>
);

export const Border = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker variant="border">
      <MarkerIcon>
        <GitHubLogoIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Switched to release-candidate</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon>
        <MagnifyingGlassIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Reviewed 8 related files</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerIcon>
        <FileTextIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Opened implementation notes</MarkerContent>
    </Marker>
  </div>
);

export const WithIcon = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker>
      <MarkerIcon>
        <GitHubLogoIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <MagnifyingGlassIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <CheckCircledIcon className="icon" />
      </MarkerIcon>
      <MarkerContent>Syncing completed</MarkerContent>
    </Marker>
  </div>
);

export const AsLink = () => (
  <div className="flex w-full max-w-md flex-col gap-1">
    <Marker asChild>
      <a href="#pr">
        <MarkerContent>View the pull request</MarkerContent>
      </a>
    </Marker>
    <Marker asChild>
      <button type="button">
        <MarkerIcon>
          <SymbolIcon className="icon" />
        </MarkerIcon>
        <MarkerContent>Retry last step</MarkerContent>
      </button>
    </Marker>
  </div>
);
