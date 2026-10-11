import { render, screen } from "@testing-library/react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { describe, expect, it } from "vitest";

import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
} from "../registry/default/components/ui/ActionBar";

describe("ActionBar", () => {
  it("exposes placement offsets as custom properties and wraps item labels", () => {
    render(
      <ActionBar open sideOffset={13} alignOffset={0}>
        <ActionBarSelection>4 selected</ActionBarSelection>
        <ActionBarGroup>
          <ActionBarItem aria-label="Archive">
            <ArchiveIcon className="icon" aria-hidden />
            Archive
          </ActionBarItem>
        </ActionBarGroup>
        <ActionBarClose aria-label="Clear selection" />
      </ActionBar>,
    );

    const bar = document.querySelector('[data-slot="action-bar"]');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveStyle({
      "--action-bar-side-offset": "13px",
      "--action-bar-align-offset": "0px",
    });
    expect(screen.getByRole("toolbar")).toHaveTextContent("4 selected");

    const label = document.querySelector('[data-slot="action-bar-item-label"]');
    expect(label).toHaveTextContent("Archive");
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear selection" }),
    ).toBeInTheDocument();
  });
});
