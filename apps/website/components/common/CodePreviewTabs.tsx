// Import required components from Radix UI and local components
import { Tabs } from "radix-ui";

import SyntaxHighlighter from "@/components/common/SyntaxHighlighter";

// Define props interface for CodePreviewTabs component
type CodePreviewTabsProps = {
  children: React.ReactNode; // Content to show in preview tab
  code: string; // Code to display in code tab
  language?: string; // Optional language for syntax highlighting
};

/**
 * CodePreviewTabs component that shows both a preview and code view
 * Uses Radix UI Tabs for switching between views
 */
const CodePreviewTabs = ({
  children,
  code,
  language,
}: CodePreviewTabsProps) => {
  return (
    <Tabs.Root className="flex flex-col" defaultValue="tab1">
      {/* Tab list header with Preview and Code options */}

      <Tabs.List className="border border-black-3 p-1 border-b-0 bg-black-2 flex rounded-t-1 gap-0.5">
        <Tabs.Trigger
          className="bg-black-2 p-0.5 data-[state=active]:bg-black-4 rounded-2 cursor-pointer"
          value="tab1"
        >
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-black-2 p-0.5 data-[state=active]:bg-black-4 rounded-2 cursor-pointer"
          value="tab2"
        >
          Code
        </Tabs.Trigger>
      </Tabs.List>

      {/* Preview tab content */}
      <Tabs.Content
        className="border border-black-3 rounded-1 rounded-t-none p-1 min-h-[33vh]"
        value="tab1"
      >
        {children}
      </Tabs.Content>

      {/* Code tab content with syntax highlighting */}
      <Tabs.Content
        value="tab2"
        className="border border-black-3 rounded-1 rounded-t-none p-1"
      >
        <SyntaxHighlighter code={code} language={language || "jsx"} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default CodePreviewTabs;
