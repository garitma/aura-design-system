import {
  ChevronLeftIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../registry/default/components/ui/ButtonGroup";
import { Button } from "../registry/default/components/ui/Button";

export const Default = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <ButtonGroup aria-label="Go back">
        <Button variant="pill" aria-label="Go back">
          <ChevronLeftIcon className="icon" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Archive and report">
        <Button variant="pill">Archive</Button>
        <Button variant="pill">Report</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Snooze">
        <Button variant="pill">Snooze</Button>
        <Button variant="pill" aria-label="More options">
          <DotsHorizontalIcon className="icon" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export const Small = () => (
  <div className="flex flex-wrap gap-2">
    <ButtonGroup size="sm" aria-label="Archive and report">
      <Button variant="pill">Archive</Button>
      <Button variant="pill">Report</Button>
    </ButtonGroup>
    <ButtonGroup size="sm" aria-label="Snooze">
      <Button variant="pill">Snooze</Button>
      <Button variant="pill" aria-label="More options">
        <DotsHorizontalIcon className="icon" />
      </Button>
    </ButtonGroup>
  </div>
);

export const ButtonIcon = () => (
  <div className="flex flex-wrap gap-2">
    <ButtonGroup aria-label="Snooze">
      <Button variant="pill">Snooze</Button>
      <Button variant="pill" aria-label="More options">
        <DotsHorizontalIcon className="icon" />
      </Button>
    </ButtonGroup>
    <ButtonGroup size="sm" aria-label="Snooze small">
      <Button variant="pill">Snooze</Button>
      <Button variant="pill" aria-label="More options">
        <DotsHorizontalIcon className="icon" />
      </Button>
    </ButtonGroup>
  </div>
);

export const Vertical = () => (
  <div className="flex flex-wrap gap-2">
    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
      <Button variant="fill">One</Button>
      <Button variant="fill">Two</Button>
      <Button variant="fill">Three</Button>
    </ButtonGroup>
    <ButtonGroup
      orientation="vertical"
      size="sm"
      aria-label="Small vertical button group"
    >
      <Button variant="fill">One</Button>
      <Button variant="fill">Two</Button>
    </ButtonGroup>
  </div>
);

export const Text = () => (
  <div className="flex flex-wrap gap-2">
    <ButtonGroup aria-label="Amount">
      <ButtonGroupText>Amount</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="pill">$100</Button>
    </ButtonGroup>
    <ButtonGroup size="sm" aria-label="Small amount">
      <ButtonGroupText>Amount</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="pill">$100</Button>
    </ButtonGroup>
  </div>
);
