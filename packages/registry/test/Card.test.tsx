import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../registry/default/components/ui/Card";
import { describe, it, expect } from "vitest";

describe("Card", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<Card>Card content</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "bg-gray-2",
      "border",
      "border-gray-6",
      "rounded-md",
      "overflow-hidden"
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className to Card", () => {
    const { container } = render(
      <Card className="custom-card-class">Content</Card>
    );
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toHaveClass("custom-card-class");
    expect(card).toHaveClass("bg-gray-2", "border", "rounded-md");
  });

  it("forwards additional props to Card", () => {
    const { container } = render(
      <Card data-testid="custom-card">Content</Card>
    );
    const card = screen.getByTestId("custom-card");
    expect(card).toBeInTheDocument();
  });
});

describe("CardHeader", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<CardHeader>Header content</CardHeader>);
    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("flex", "flex-col", "gap-0.5", "p-1");
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("applies custom className to CardHeader", () => {
    const { container } = render(
      <CardHeader className="custom-header-class">Header</CardHeader>
    );
    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toHaveClass("custom-header-class");
    expect(header).toHaveClass("flex", "flex-col", "gap-0.5", "p-1");
  });

  it("forwards additional props to CardHeader", () => {
    render(<CardHeader data-testid="custom-header">Header</CardHeader>);
    const header = screen.getByTestId("custom-header");
    expect(header).toBeInTheDocument();
  });
});

describe("CardTitle", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<CardTitle>Card Title</CardTitle>);
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).toBeInTheDocument();
    expect(title?.tagName).toBe("H3");
    expect(title).toHaveClass("text-gray-12", "font-semibold", "leading-none");
    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });

  it("applies custom className to CardTitle", () => {
    const { container } = render(
      <CardTitle className="custom-title-class">Title</CardTitle>
    );
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).toHaveClass("custom-title-class");
    expect(title).toHaveClass("text-gray-12", "font-semibold", "leading-none");
  });

  it("forwards additional props to CardTitle", () => {
    render(<CardTitle data-testid="custom-title">Title</CardTitle>);
    const title = screen.getByTestId("custom-title");
    expect(title).toBeInTheDocument();
  });
});

describe("CardDescription", () => {
  it("renders correctly with default props", () => {
    const { container } = render(
      <CardDescription>Card description</CardDescription>
    );
    const description = container.querySelector(
      '[data-slot="card-description"]'
    );
    expect(description).toBeInTheDocument();
    expect(description?.tagName).toBe("P");
    expect(description).toHaveClass("text-gray-11");
    expect(screen.getByText("Card description")).toBeInTheDocument();
  });

  it("applies custom className to CardDescription", () => {
    const { container } = render(
      <CardDescription className="custom-description-class">
        Description
      </CardDescription>
    );
    const description = container.querySelector(
      '[data-slot="card-description"]'
    );
    expect(description).toHaveClass("custom-description-class");
    expect(description).toHaveClass("text-gray-11");
  });

  it("forwards additional props to CardDescription", () => {
    render(
      <CardDescription data-testid="custom-description">
        Description
      </CardDescription>
    );
    const description = screen.getByTestId("custom-description");
    expect(description).toBeInTheDocument();
  });
});

describe("CardAction", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<CardAction>Action content</CardAction>);
    const action = container.querySelector('[data-slot="card-action"]');
    expect(action).toBeInTheDocument();
    expect(action).toHaveClass("flex", "items-center", "gap-0.5");
    expect(screen.getByText("Action content")).toBeInTheDocument();
  });

  it("applies custom className to CardAction", () => {
    const { container } = render(
      <CardAction className="custom-action-class">Action</CardAction>
    );
    const action = container.querySelector('[data-slot="card-action"]');
    expect(action).toHaveClass("custom-action-class");
    expect(action).toHaveClass("flex", "items-center", "gap-0.5");
  });

  it("forwards additional props to CardAction", () => {
    render(<CardAction data-testid="custom-action">Action</CardAction>);
    const action = screen.getByTestId("custom-action");
    expect(action).toBeInTheDocument();
  });
});

describe("CardContent", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<CardContent>Content text</CardContent>);
    const content = container.querySelector('[data-slot="card-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("p-1");
    expect(screen.getByText("Content text")).toBeInTheDocument();
  });

  it("applies custom className to CardContent", () => {
    const { container } = render(
      <CardContent className="custom-content-class">Content</CardContent>
    );
    const content = container.querySelector('[data-slot="card-content"]');
    expect(content).toHaveClass("custom-content-class");
    expect(content).toHaveClass("p-1");
  });

  it("forwards additional props to CardContent", () => {
    render(<CardContent data-testid="custom-content">Content</CardContent>);
    const content = screen.getByTestId("custom-content");
    expect(content).toBeInTheDocument();
  });
});

describe("CardFooter", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<CardFooter>Footer content</CardFooter>);
    const footer = container.querySelector('[data-slot="card-footer"]');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(
      "flex",
      "items-center",
      "gap-0.5",
      "p-1",
      "border-t",
      "border-gray-6"
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("applies custom className to CardFooter", () => {
    const { container } = render(
      <CardFooter className="custom-footer-class">Footer</CardFooter>
    );
    const footer = container.querySelector('[data-slot="card-footer"]');
    expect(footer).toHaveClass("custom-footer-class");
    expect(footer).toHaveClass(
      "flex",
      "items-center",
      "gap-0.5",
      "p-1",
      "border-t"
    );
  });

  it("forwards additional props to CardFooter", () => {
    render(<CardFooter data-testid="custom-footer">Footer</CardFooter>);
    const footer = screen.getByTestId("custom-footer");
    expect(footer).toBeInTheDocument();
  });
});

describe("Card - Complete Structure", () => {
  it("renders a complete card with all components", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>Main content goes here</CardContent>
        <CardFooter>
          <CardAction>Footer actions</CardAction>
        </CardFooter>
      </Card>
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-header"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-title"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-description"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-footer"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-action"]')
    ).toBeInTheDocument();

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description text")).toBeInTheDocument();
    expect(screen.getByText("Main content goes here")).toBeInTheDocument();
    expect(screen.getByText("Footer actions")).toBeInTheDocument();
  });

  it("renders card with header and content only", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
        </CardHeader>
        <CardContent>Simple content</CardContent>
      </Card>
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-header"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-title"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-footer"]')
    ).not.toBeInTheDocument();
  });

  it("renders multiple cards independently", () => {
    const { container } = render(
      <div>
        <Card>
          <CardTitle>Card 1</CardTitle>
        </Card>
        <Card>
          <CardTitle>Card 2</CardTitle>
        </Card>
        <Card>
          <CardTitle>Card 3</CardTitle>
        </Card>
      </div>
    );

    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards).toHaveLength(3);
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Card 3")).toBeInTheDocument();
  });

  it("preserves all data-slot attributes", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>
          <CardAction>Action</CardAction>
        </CardFooter>
      </Card>
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-header"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-title"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-description"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-footer"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-action"]')
    ).toBeInTheDocument();
  });
});
