import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../registry/default/components/ui/CodeBlock";

describe("CodeBlock", () => {
  it("renders a titled block and copies its value", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>Terminal</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value="pnpm test" />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>pnpm test</CodeBlockContent>
      </CodeBlock>
    );

    expect(screen.getByText("Terminal")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("pnpm test"));
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("numbers lines from startLine and can wrap", () => {
    const { container } = render(
      <CodeBlock size="sm">
        <CodeBlockContent lineNumbers startLine={8} wrap>
          {"alpha\n\nbeta"}
        </CodeBlockContent>
      </CodeBlock>
    );

    const block = container.querySelector("[data-slot=code-block]");
    const content = container.querySelector("[data-slot=code-block-content]");
    expect(block).toHaveAttribute("data-size", "sm");
    expect(content).toHaveAttribute("data-numbered", "true");
    expect(content).toHaveAttribute("data-wrap", "true");
    expect(content).toHaveStyle({ counterReset: "line 7" });
    expect(container.querySelectorAll("[data-slot=code-block-line]")).toHaveLength(3);
    const blank = container.querySelectorAll("[data-slot=code-block-line-text]")[1];
    expect(blank?.textContent).toBe("\n");
  });

  it("marks added, removed, and highlighted lines", () => {
    const { container } = render(
      <CodeBlock>
        <CodeBlockContent>
          <CodeBlockLine variant="removed">old</CodeBlockLine>
          <CodeBlockLine variant="added">new</CodeBlockLine>
          <CodeBlockLine variant="highlighted">note</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    );

    expect(container.querySelector("[data-variant=removed]")).toHaveClass("bg-gray-4");
    expect(container.querySelector("[data-variant=added]")).toHaveClass("bg-accent-3");
    expect(container.querySelector("[data-variant=highlighted]")).toHaveClass(
      "bg-accent-4"
    );
  });

  it("keeps diff markers out of the copied line text", () => {
    const css = readFileSync(
      resolve(__dirname, "../registry/default/styles/code-block.css"),
      "utf8"
    );
    expect(css).toMatch(/content:\s*"\+"/);
    expect(css).toMatch(/content:\s*"−"/);
    expect(css).toMatch(/user-select:\s*none/);
    expect(css).toMatch(/counter\(line\)/);
  });
});
