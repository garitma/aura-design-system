import { fireEvent, render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../registry/default/components/ui/Breadcrumb";
import { describe, expect, it } from "vitest";

function Trail({ maxItems }: { maxItems?: number }) {
  return (
    <Breadcrumb>
      <BreadcrumbList maxItems={maxItems}>
        <BreadcrumbItem>
          <BreadcrumbLink href="#home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("styles the current page as semibold gray-12 and marks it with aria-current", () => {
    render(<Trail />);
    const page = screen.getByText("Breadcrumb");

    expect(page.tagName).toBe("SPAN");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).not.toHaveAttribute("role");
    expect(page).not.toHaveAttribute("aria-disabled");
    expect(page).toHaveClass("small", "font-semibold", "text-gray-12");
    expect(page).not.toHaveClass("font-medium");
  });

  it("underlines links on hover and rounds the focus ring", () => {
    render(<Trail />);
    const link = screen.getByRole("link", { name: "Home" });

    expect(link).toHaveClass(
      "small",
      "hover:text-gray-12",
      "hover:underline",
      "underline-offset-2",
      "rounded-sm",
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-accent-8",
    );
    expect(link).not.toHaveClass("text-sm");
  });

  it("puts small on the list and on a slotted link", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="#home">Home</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const list = document.querySelector('[data-slot="breadcrumb-list"]');
    expect(list).toHaveClass("small");
    expect(list).not.toHaveClass("text-sm");
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("small");
  });

  it("collapses to the first crumb, an ellipsis, and the current page when maxItems is exceeded", () => {
    render(<Trail maxItems={2} />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Docs" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Components" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Breadcrumb")).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="breadcrumb-ellipsis"]'),
    ).toBeInTheDocument();
  });

  it("keeps middle crumbs for a narrow container and reveals them from the ellipsis", () => {
    render(<Trail />);

    const docs = screen.getByRole("link", { name: "Docs" });
    expect(docs.closest("li")).toHaveAttribute("data-breadcrumb", "middle");
    expect(
      document.querySelector('[data-slot="breadcrumb-list"]'),
    ).toHaveAttribute("data-collapse", "sm");

    fireEvent.click(
      screen.getByRole("button", { name: "Show more breadcrumbs" }),
    );

    expect(
      document.querySelector('[data-slot="breadcrumb-list"]'),
    ).not.toHaveAttribute("data-collapse");
    expect(
      screen.getByRole("link", { name: "Docs" }).closest("li"),
    ).not.toHaveAttribute("data-breadcrumb");
  });
});
