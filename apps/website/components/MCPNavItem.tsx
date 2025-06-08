import Button from "@/components/ui/Button";
import { MCPIcon } from "@/components/icons";
import DialogModal from "./DialogModal";
import SyntaxHighlighter from "./SyntaxHighlighter";

const MCPNavItem = () => {
  const mcpConfig = {
    mcpServers: {
      shadcn: {
        command: "npx",
        args: ["-y", "shadcn@canary", "registry:mcp"],
        env: {
          REGISTRY_URL: "https://auradesignsystem.com/r/registry.json",
        },
      },
    },
  };

  return (
    <li>
      <DialogModal
        trigger={
          <Button mode="menu" className="flex gap-0.5">
            <MCPIcon /> MCP
          </Button>
        }
        title="Setup MCP"
        description="Use the code below to configure the registry MCP in your IDE."
      >
        <SyntaxHighlighter
          code={JSON.stringify(mcpConfig, null, 2)}
          language="json"
        />
      </DialogModal>
    </li>
  );
};

export default MCPNavItem;
