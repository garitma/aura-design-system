"use client";

import { useMemo, useState, type ComponentProps, type ReactNode } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ClipboardCopyIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "fumadocs-core/framework";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";

import { cn } from "@/utils/class-names";
import Button, { buttonVariants } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

const markdownCache = new Map<string, Promise<string>>();

/**
 * Aura-styled docs page actions: copy Markdown + open in Cursor / Claude / ChatGPT.
 * Pattern from https://fumadocs.dev/docs/integrations/llms#page-actions
 */
export function MarkdownCopyButton({
  markdownUrl,
  className,
  children,
  ...props
}: ComponentProps<"button"> & {
  markdownUrl: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = markdownCache.get(markdownUrl);
    if (cached) {
      await navigator.clipboard.writeText(await cached);
      return;
    }

    setLoading(true);
    try {
      const promise = fetch(markdownUrl).then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${markdownUrl}`);
        return res.text();
      });
      markdownCache.set(markdownUrl, promise);
      await navigator.clipboard.write([
        new ClipboardItem({ "text/plain": promise }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Button
      type="button"
      variant="pill"
      size="sm"
      disabled={isLoading}
      onClick={onClick}
      className={cn("gap-0.5", className)}
      aria-label={checked ? "Copied Markdown" : "Copy Markdown"}
      {...props}
    >
      {checked ? (
        <CheckIcon className="icon" />
      ) : (
        <ClipboardCopyIcon className="icon" />
      )}
      {children ?? "Copy Markdown"}
    </Button>
  );
}

type OpenItem = {
  title: string;
  href: string;
  icon: ReactNode;
};

function useOpenItems({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl?: string;
  githubUrl?: string;
}): OpenItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    const pageUrl =
      typeof window === "undefined"
        ? pathname
        : new URL(pathname, window.location.origin).toString();
    const q = `Read ${pageUrl}, I want to ask questions about it.`;

    return [
      githubUrl && {
        title: "Open in GitHub",
        href: githubUrl,
        icon: <GitHubLogoIcon className="icon" />,
      },
      markdownUrl && {
        title: "View as Markdown",
        href: markdownUrl,
        icon: <FileTextIcon className="icon" />,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: <ChatGPTIcon className="icon" />,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({ q })}`,
        icon: <ClaudeIcon className="icon" />,
      },
      {
        title: "Open in Cursor",
        href: `https://cursor.com/link/prompt?${new URLSearchParams({
          text: q,
        })}`,
        icon: <CursorIcon className="icon" />,
      },
    ].filter(Boolean) as OpenItem[];
  }, [githubUrl, markdownUrl, pathname]);
}

export function ViewOptionsPopover({
  markdownUrl,
  githubUrl,
  className,
  children,
  ...props
}: ComponentProps<typeof PopoverTrigger> & {
  markdownUrl?: string;
  githubUrl?: string;
}) {
  const items = useOpenItems({ markdownUrl, githubUrl });

  return (
    <Popover>
      <PopoverTrigger
        {...props}
        className={cn(
          buttonVariants({ variant: "pill", size: "sm" }),
          "gap-0.5 data-[state=open]:bg-gray-3",
          className
        )}
      >
        {children ?? "Open"}
        <ChevronDownIcon className="icon" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex min-w-20 flex-col overflow-hidden p-0.5"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className="inline-flex items-center gap-0.5 rounded-sm p-0.5 text-gray-12 hover:bg-gray-3"
          >
            {item.icon}
            <span className="text-sm">{item.title}</span>
            <ExternalLinkIcon className="icon ms-auto text-gray-11" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function DocsPageActions({
  markdownUrl,
  githubUrl,
  className,
}: {
  markdownUrl: string;
  githubUrl?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-1 flex flex-row flex-wrap items-center gap-0.5 border-b border-gray-6 pb-1",
        className
      )}
    >
      <MarkdownCopyButton markdownUrl={markdownUrl} />
      <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
    </div>
  );
}

function ChatGPTIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <title>OpenAI</title>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function ClaudeIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <title>Anthropic</title>
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  );
}

function CursorIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <title>Cursor</title>
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}
