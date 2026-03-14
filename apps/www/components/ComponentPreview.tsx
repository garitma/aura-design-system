"use client";

import * as React from "react";
import { Registry, type RegistryName } from "@/components/demos";
import {
  ReloadIcon,
  ClipboardCopyIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

// Interface for component preview properties
interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: RegistryName;
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
}

// Component to display preview and code of components
export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  description,
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  // Memoize the preview component for performance optimization
  const Preview = React.useMemo(() => {
    const Component = Registry[name]?.component;

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  // Memoize the code string for performance optimization
  const codeString = React.useMemo(() => {
    if (
      typeof (Code as any)?.props["data-rehype-pretty-code-fragment"] !==
      "undefined"
    ) {
      const [Button] = React.Children.toArray(
        (Code as any).props.children
      ) as React.ReactElement[];
      return (
        (Button as any)?.props?.value ||
        (Button as any)?.props?.__rawString__ ||
        null
      );
    }
  }, [Code]);

  return (
    <div
      data-sloth="preview-container"
      className={cn(
        "group relative flex flex-col not-prose overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "preview flex min-h-[450px] w-full p-2 border border-gray-a6 rounded-lg",
          name === "sidebar-demo"
            ? "items-stretch"
            : {
                "justify-center items-center": align === "center",
                "justify-center items-start": align === "start",
                "justify-center items-end": align === "end",
              }
        )}
      >
        <div
          className={cn(
            "w-full min-h-[420px]",
            name === "sidebar-demo" && "translate-z-0 overflow-hidden rounded-md"
          )}
        >
          <React.Suspense
            fallback={
              <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            }
          >
            {Preview}
          </React.Suspense>
        </div>
      </div>
      <div className="flex flex-col space-y-4 -mt-2">
        <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto ">
          {Code}
        </div>
      </div>
    </div>
  );
}
