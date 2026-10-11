import { render, screen } from "@testing-library/react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertContent,
  AlertIcon,
  AlertStatus,
} from "../registry/default/components/ui/Alert";
import { describe, it, expect } from "vitest";
import * as React from "react";
import { BellIcon } from "@radix-ui/react-icons";

describe("Alert", () => {
  it("renders correctly with default props", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass(
      "bg-background",
      "text-foreground",
      "border",
      "border-gray-6",
    );
    expect(alert).not.toHaveClass("space-y-0.5");
    expect(screen.getByText("Heads up!")).toHaveClass("font-bold", "p");
    expect(
      screen.getByText("You can add components to your app using the cli."),
    ).toHaveClass("p");
    expect(screen.getByText("Heads up!")).toBeInTheDocument();
    expect(
      screen.getByText("You can add components to your app using the cli."),
    ).toBeInTheDocument();
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<Alert variant="info">Info Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-info",
      "text-info-contrast",
    );

    rerender(<Alert variant="success">Success Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-success",
      "text-success-contrast",
    );

    rerender(<Alert variant="warning">Warning Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-warning",
      "text-warning-contrast",
    );

    rerender(<Alert variant="danger">Danger Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-danger",
      "text-danger-contrast",
      "border-danger-contrast",
    );
  });

  it("merges className on content, icon, and description", () => {
    render(
      <Alert>
        <AlertIcon className="icon-slot">
          <BellIcon className="icon" />
        </AlertIcon>
        <AlertContent className="content-slot">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className="description-slot">
            You can add components to your app using the cli.
          </AlertDescription>
        </AlertContent>
      </Alert>,
    );

    expect(document.querySelector("[data-slot=alert-icon]")).toHaveClass(
      "shrink-0",
      "icon-slot",
    );
    expect(document.querySelector("[data-slot=alert-content]")).toHaveClass(
      "content-slot",
      "gap-0.5",
    );
    expect(document.querySelector("[data-slot=alert-description]")).toHaveClass(
      "p",
      "description-slot",
    );
  });
});

describe("AlertStatus", () => {
  it("renders correctly with title and description", () => {
    render(
      <AlertStatus
        title="Success!"
        description="Your changes have been saved."
        status="success"
      />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-success");
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText("Your changes have been saved."),
    ).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    render(
      <AlertStatus
        title="Notification"
        description="You have a new message."
        status="info"
        icon={BellIcon}
      />,
    );
    // We can't easily test for the icon component itself without a testid,
    // but we can check if the alert renders without crashing and contains the text.
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("bg-info");
  });

  it("renders the default status and forwards class names", () => {
    render(
      <AlertStatus
        title="Notice"
        description="Nothing needs attention."
        status="default"
      />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("border-gray-6", "bg-background");
    expect(screen.getByText("Notice")).toHaveClass("font-bold");
    expect(screen.getByText("Nothing needs attention.")).toHaveClass("p");
  });
});
