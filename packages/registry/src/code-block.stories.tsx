import { useId, useState } from "react";
import { Button } from "../registry/default/components/ui/Button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../registry/default/components/ui/CodeBlock";

const routeSource = `export async function POST(request: Request) {
  const body = await request.json()
  return Response.json(body)
}`;

const terminalOutput = `$ pnpm install --frozen-lockfile
ERR_PNPM_OUTDATED_LOCKFILE
 package.json | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)`;

const logOutput = `[01] GET /api/chat 200 in 12ms
[02] GET /api/chat 200 in 19ms
[03] GET /api/chat 200 in 26ms
[04] GET /api/chat 200 in 33ms
[05] GET /api/chat 200 in 40ms
[06] GET /api/chat 500 in 47ms`;

export const Default = () => (
  <div className="w-full max-w-lg">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>app/api/chat/route.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={routeSource} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>{routeSource}</CodeBlockContent>
    </CodeBlock>
  </div>
);

export const Terminal = () => (
  <div className="w-full max-w-lg">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>Terminal</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={terminalOutput} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{terminalOutput}</CodeBlockContent>
    </CodeBlock>
  </div>
);

export const Diff = () => (
  <div className="w-full max-w-lg">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>package.json</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        <CodeBlockLine>{"{"}</CodeBlockLine>
        <CodeBlockLine variant="removed">  &quot;version&quot;: &quot;1.2.0&quot;</CodeBlockLine>
        <CodeBlockLine variant="added">  &quot;version&quot;: &quot;1.3.0&quot;</CodeBlockLine>
        <CodeBlockLine>{"}"}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
);

export const Highlighted = () => (
  <div className="w-full max-w-lg">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>next.config.ts</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers startLine={4}>
        <CodeBlockLine>experimental: {"{"}</CodeBlockLine>
        <CodeBlockLine variant="highlighted">  reactCompiler: true,</CodeBlockLine>
        <CodeBlockLine>{"}"},</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  </div>
);

export const Wrap = () => (
  <div className="w-full max-w-lg">
    <CodeBlock variant="danger">
      <CodeBlockHeader>
        <CodeBlockTitle>Logs</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent wrap>
        Error: The model returned an error. The prompt is 212431 tokens and the
        context window is 200000 tokens. Remove some messages or summarize the
        conversation and try again.
      </CodeBlockContent>
    </CodeBlock>
  </div>
);

export const Small = () => (
  <div className="w-full max-w-lg">
    <CodeBlock size="sm">
      <CodeBlockHeader>
        <CodeBlockTitle>node --version</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value="v24.18.0" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>v24.18.0</CodeBlockContent>
    </CodeBlock>
  </div>
);

export const FloatingActions = () => (
  <div className="w-full max-w-lg">
    <CodeBlock>
      <CodeBlockActions>
        <CodeBlockCopyButton value={terminalOutput} />
      </CodeBlockActions>
      <CodeBlockContent>{terminalOutput}</CodeBlockContent>
    </CodeBlock>
  </div>
);

export const Logs = () => {
  const [expanded, setExpanded] = useState(false);
  const outputId = useId();

  return (
    <div className="w-full max-w-lg">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>Logs</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={logOutput} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent
          id={outputId}
          className={expanded ? undefined : "max-h-16 overflow-y-hidden"}
        >
          {logOutput}
        </CodeBlockContent>
        <CodeBlockFooter className="justify-center">
          <Button
            type="button"
            variant="pill"
            size="xs"
            aria-expanded={expanded}
            aria-controls={outputId}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </CodeBlockFooter>
      </CodeBlock>
    </div>
  );
};
