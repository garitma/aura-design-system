import { render, screen } from "@testing-library/react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
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
      </Alert>
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-background", "text-foreground");
    expect(screen.getByText("Heads up!")).toBeInTheDocument();
    expect(
      screen.getByText("You can add components to your app using the cli.")
    ).toBeInTheDocument();
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<Alert variant="info">Info Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-info",
      "text-info-contrast"
    );

    rerender(<Alert variant="success">Success Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-success",
      "text-success-contrast"
    );

    rerender(<Alert variant="warning">Warning Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-warning",
      "text-warning-contrast"
    );

    rerender(<Alert variant="danger">Danger Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-danger",
      "text-danger-contrast"
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
      />
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-success");
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText("Your changes have been saved.")
    ).toBeInTheDocument();
  });

  it("renders with custom icon", () => {
    render(
      <AlertStatus
        title="Notification"
        description="You have a new message."
        status="info"
        icon={BellIcon}
      />
    );
    // We can't easily test for the icon component itself without a testid,
    // but we can check if the alert renders without crashing and contains the text.
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("bg-info");
  });
});
