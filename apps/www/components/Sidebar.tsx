"use client";
import { ChevronDown, ExternalLink } from "lucide-react";
import { usePathname } from "fumadocs-core/framework";
import {
  type ComponentProps,
  createContext,
  type FC,
  Fragment,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link, { type LinkProps } from "fumadocs-core/link";
import { useOnChange } from "fumadocs-core/utils/use-on-change";

import { cn } from "../utils/class-names";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { isActive } from "../utils/is-active";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/Collapsible";
import { type ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { useSidebar } from "@/components/layout/contexts/sidebar";
import { cva } from "class-variance-authority";
import type {
  CollapsibleContentProps,
  CollapsibleTriggerProps,
} from "@radix-ui/react-collapsible";
import type * as PageTree from "fumadocs-core/page-tree";
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree";
import { useMediaQuery } from "fumadocs-core/utils/use-media-query";
import { Presence } from "@radix-ui/react-presence";

export interface SidebarProps {
  defaultOpenLevel?: number;

  prefetch?: boolean;

  Content: ReactNode;

  Mobile?: ReactNode;
}

interface InternalContext {
  defaultOpenLevel: number;
  prefetch: boolean;
  level: number;
}

const itemVariants = cva(
  "relative flex flex-row items-center gap-0.5 rounded-lg p-0.5 ps-(--sidebar-item-offset) text-start text-fd-muted-foreground [overflow-wrap:anywhere] [&_svg]:size-1 [&_svg]:shrink-0 mx-0.5",
  {
    variants: {
      active: {
        true: "text-accent-11",
        false:
          "transition-colors hover:bg-gray-3 hover:text-gray-12 hover:transition-none",
      },
    },
  }
);

const Context = createContext<InternalContext | null>(null);
const FolderContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function Sidebar({
  defaultOpenLevel = 0,
  prefetch = true,
  Mobile,
  Content,
}: SidebarProps) {
  const isMobile = useMediaQuery("(width < 768px)") ?? false;
  const context = useMemo<InternalContext>(() => {
    return {
      defaultOpenLevel,
      prefetch,
      level: 1,
    };
  }, [defaultOpenLevel, prefetch]);

  return (
    <Context.Provider value={context}>
      {isMobile && Mobile != null ? Mobile : Content}
    </Context.Provider>
  );
}

const sidebarFocusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getSidebarFocusable(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(sidebarFocusableSelector)).filter(
    (node) => !node.hasAttribute("disabled") && node.getClientRects().length > 0
  );
}

export function SidebarContent(props: ComponentProps<"aside">) {
  const isMobile = useMediaQuery("(width < 768px)") ?? false;
  const { collapsed } = useSidebar();
  const [hover, setHover] = useState(false);
  const timerRef = useRef(0);
  const closeTimeRef = useRef(0);

  useOnChange(collapsed, () => {
    setHover(false);
    closeTimeRef.current = Date.now() + 150;
  });

  if (isMobile) {
    return <SidebarContentMobile {...props} />;
  }

  return (
    <aside
      id="nd-sidebar"
      {...props}
      data-collapsed={collapsed}
      className={cn(
        "fixed left-0 rtl:left-auto rtl:right-(--removed-body-scroll-bar-size,0) flex flex-col items-end top-(--fd-sidebar-top) bottom-(--fd-sidebar-margin) z-20 bg-gray-2 text-sm border-e transition-[top,opacity,translate,width] duration-200 max-md:hidden *:w-(--fd-sidebar-width)",
        collapsed && [
          "rounded-xl border translate-x-(--fd-sidebar-offset) rtl:-translate-x-(--fd-sidebar-offset)",
          hover ? "z-50 shadow-lg" : "opacity-0",
        ],
        props.className
      )}
      style={
        {
          ...props.style,
          "--fd-sidebar-offset": hover
            ? "calc(var(--spacing) * 2)"
            : "calc(16px - 100%)",
          "--fd-sidebar-margin": collapsed ? "0.5rem" : "0px",
          "--fd-sidebar-top": `calc(var(--fd-banner-height) + var(--fd-nav-height) + var(--fd-sidebar-margin))`,
          width: collapsed
            ? "var(--fd-sidebar-width)"
            : "calc(var(--spacing) + var(--fd-sidebar-width) + var(--fd-layout-offset))",
        } as object
      }
      onPointerEnter={(e) => {
        if (
          !collapsed ||
          e.pointerType === "touch" ||
          closeTimeRef.current > Date.now()
        )
          return;
        window.clearTimeout(timerRef.current);
        setHover(true);
      }}
      onPointerLeave={(e) => {
        if (!collapsed || e.pointerType === "touch") return;
        window.clearTimeout(timerRef.current);

        timerRef.current = window.setTimeout(
          () => {
            setHover(false);
            closeTimeRef.current = Date.now() + 150;
          },
          Math.min(e.clientX, document.body.clientWidth - e.clientX) > 100
            ? 0
            : 500
        );
      }}
    >
      {props.children}
    </aside>
  );
}

export function SidebarContentMobile({
  className,
  children,
  style,
  ...props
}: ComponentProps<"aside">) {
  const { open, setOpen } = useSidebar();
  const state = open ? "open" : "closed";

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("nd-sidebar")?.focus();
      });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      const aside = document.getElementById("nd-sidebar");
      if (!aside) return;

      if (event.key === "Escape") {
        if (event.target instanceof Node && aside.contains(event.target)) {
          event.preventDefault();
          setOpen(false);
        }
        return;
      }

      if (event.key !== "Tab") return;
      if (
        !(document.activeElement instanceof Node) ||
        !aside.contains(document.activeElement)
      ) {
        return;
      }

      const nodes = getSidebarFocusable(aside);
      if (nodes.length === 0) {
        event.preventDefault();
        aside.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open, setOpen]);

  return (
    <>
      <Presence present={open}>
        <div
          data-state={state}
          aria-hidden="true"
          className="aura-overlay z-40 h-dvh data-[state=closed]:animate-fd-fade-out motion-reduce:animate-none"
          onClick={() => setOpen(false)}
        />
      </Presence>
      <Presence present={open}>
        <aside
          id="nd-sidebar"
          {...props}
          data-state={state}
          role="dialog"
          aria-modal="true"
          aria-label={props["aria-label"] ?? "Documentation"}
          tabIndex={props.tabIndex ?? -1}
          className={cn(
            "fixed end-0 top-0 z-40 flex h-dvh w-full max-w-26 min-h-0 origin-right flex-col overflow-hidden border-s bg-gray-2 text-sm shadow-lg outline-none data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out data-[state=closed]:pointer-events-none motion-reduce:animate-none rtl:origin-left",
            className
          )}
          style={style}
          onClick={(event) => {
            props.onClick?.(event);
            if (event.defaultPrevented) return;
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (target.closest("a[href]")) setOpen(false);
          }}
        >
          {children}
        </aside>
      </Presence>
    </>
  );
}

export function SidebarHeader(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-col gap-1 p-1 pb-0.5", props.className)}
    >
      {props.children}
    </div>
  );
}

export function SidebarFooter(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-col border-t p-1 pt-0.5 gap-1", props.className)}
    >
      {props.children}
    </div>
  );
}

export function SidebarViewport(props: ScrollAreaProps) {
  return (
    <ScrollArea
      {...props}
      className={cn("h-full min-h-0 flex-1", props.className)}
    >
      <div
        className="overscroll-contain"
        style={
          {
            "--sidebar-item-offset": "calc(var(--spacing) * 2)",
            maskImage:
              "linear-gradient(to bottom, transparent, white 12px, white calc(100% - 12px), transparent)",
          } as React.CSSProperties
        }
      >
        {props.children}
      </div>
    </ScrollArea>
  );
}

export function SidebarSeparator(props: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "inline-flex items-center gap-2 mb-0.5 px-0.5 ps-(--sidebar-item-offset) empty:mb-0 [&_svg]:size-4 [&_svg]:shrink-0 font-medium",
        props.className
      )}
    >
      {props.children}
    </p>
  );
}

export function SidebarItem({
  icon,
  ...props
}: LinkProps & {
  icon?: ReactNode;
}) {
  const pathname = usePathname();
  const active =
    props.href !== undefined && isActive(props.href, pathname, false);
  const { prefetch } = useInternalContext();

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(itemVariants({ active }), "w-full", props.className)}
      prefetch={prefetch}
    >
      {icon ?? (props.external ? <ExternalLink /> : null)}
      {props.children}
    </Link>
  );
}

export function SidebarFolder({
  defaultOpen = false,
  ...props
}: ComponentProps<"div"> & {
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useOnChange(defaultOpen, (v) => {
    if (v) setOpen(v);
  });

  return (
    <Collapsible open={open} onOpenChange={setOpen} {...props}>
      <FolderContext.Provider
        value={useMemo(() => ({ open, setOpen }), [open])}
      >
        {props.children}
      </FolderContext.Provider>
    </Collapsible>
  );
}

export function SidebarFolderTrigger({
  className,
  ...props
}: CollapsibleTriggerProps) {
  const { open } = useFolderContext();

  return (
    <CollapsibleTrigger
      className={cn(itemVariants({ active: false }), "w-full", className)}
      {...props}
    >
      {props.children}
      <ChevronDown
        data-icon
        className={cn("ms-auto transition-transform", !open && "-rotate-90")}
      />
    </CollapsibleTrigger>
  );
}

export function SidebarFolderLink(props: LinkProps) {
  const { open, setOpen } = useFolderContext();
  const { prefetch } = useInternalContext();

  const pathname = usePathname();
  const active =
    props.href !== undefined && isActive(props.href, pathname, false);

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(itemVariants({ active }), "w-full", props.className)}
      onClick={(e) => {
        if (
          e.target instanceof Element &&
          e.target.matches("[data-icon], [data-icon] *")
        ) {
          setOpen(!open);
          e.preventDefault();
        } else {
          setOpen(active ? !open : true);
        }
      }}
      prefetch={prefetch}
    >
      {props.children}
      <ChevronDown
        data-icon
        className={cn("ms-auto transition-transform", !open && "-rotate-90")}
      />
    </Link>
  );
}

export function SidebarFolderContent(props: CollapsibleContentProps) {
  const { level, ...ctx } = useInternalContext();

  return (
    <CollapsibleContent
      {...props}
      className={cn(
        "relative",
        level === 1 && [
          "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-gray-6 before:start-2.5",
          "**:data-[active=true]:before:content-[''] **:data-[active=true]:before:bg-accent-9 **:data-[active=true]:before:absolute **:data-[active=true]:before:w-px **:data-[active=true]:before:inset-y-2.5 **:data-[active=true]:before:start-2.5",
        ],
        props.className
      )}
      style={
        {
          "--sidebar-item-offset": `calc(var(--spacing) * ${(level + 1) * 3})`,
          ...props.style,
        } as object
      }
    >
      <Context.Provider
        value={useMemo(
          () => ({
            ...ctx,
            level: level + 1,
          }),
          [ctx, level]
        )}
      >
        {props.children}
      </Context.Provider>
    </CollapsibleContent>
  );
}

export function SidebarTrigger({
  children,
  ...props
}: ComponentProps<"button">) {
  const { open, setOpen } = useSidebar();

  return (
    <button
      type="button"
      aria-controls="nd-sidebar"
      {...props}
      aria-expanded={open}
      aria-label={props["aria-label"] ?? (open ? "Close sidebar" : "Open sidebar")}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) setOpen((prev) => !prev);
      }}
    >
      {children}
    </button>
  );
}

export function SidebarCollapseTrigger(props: ComponentProps<"button">) {
  const { collapsed, setCollapsed, open, setOpen } = useSidebar();
  const isMobile = useMediaQuery("(width < 768px)") ?? false;

  return (
    <button
      type="button"
      data-collapsed={collapsed}
      {...props}
      aria-label={
        props["aria-label"] ?? (isMobile || open ? "Close sidebar" : "Collapse Sidebar")
      }
      onClick={(event) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;
        if (isMobile || open) setOpen(false);
        else setCollapsed((prev) => !prev);
      }}
    >
      {props.children}
    </button>
  );
}

function useFolderContext() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("Missing sidebar folder");

  return ctx;
}

function useInternalContext() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("<Sidebar /> component required.");

  return ctx;
}

export interface SidebarComponents {
  Item: FC<{ item: PageTree.Item }>;
  Folder: FC<{ item: PageTree.Folder; level: number; children: ReactNode }>;
  Separator: FC<{ item: PageTree.Separator }>;
}

export function SidebarPageTree(props: {
  components?: Partial<SidebarComponents>;
}) {
  const { root } = useTreeContext();

  return useMemo(() => {
    const { Separator, Item, Folder } = props.components ?? {};

    function renderSidebarList(
      items: PageTree.Node[],
      level: number
    ): ReactNode[] {
      return items.map((item, i) => {
        if (item.type === "separator") {
          if (Separator) return <Separator key={i} item={item} />;
          return (
            <SidebarSeparator key={i} className={cn(i !== 0 && "mt-2")}>
              {item.icon}
              {item.name}
            </SidebarSeparator>
          );
        }

        if (item.type === "folder") {
          const children = renderSidebarList(item.children, level + 1);

          if (Folder)
            return (
              <Folder key={i} item={item} level={level}>
                {children}
              </Folder>
            );
          return (
            <PageTreeFolder key={i} item={item}>
              {children}
            </PageTreeFolder>
          );
        }

        if (Item) return <Item key={item.url} item={item} />;
        return (
          <SidebarItem
            key={item.url}
            href={item.url}
            external={item.external}
            icon={item.icon}
          >
            {item.name}
          </SidebarItem>
        );
      });
    }

    return (
      <Fragment key={root.$id}>{renderSidebarList(root.children, 1)}</Fragment>
    );
  }, [props.components, root]);
}

function PageTreeFolder({
  item,
  ...props
}: {
  item: PageTree.Folder;
  children: ReactNode;
}) {
  const { defaultOpenLevel, level } = useInternalContext();
  const path = useTreePath();

  return (
    <SidebarFolder
      defaultOpen={
        (item.defaultOpen ?? defaultOpenLevel >= level) || path.includes(item)
      }
    >
      {item.index ? (
        <SidebarFolderLink
          href={item.index.url}
          external={item.index.external}
          {...props}
        >
          {item.icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger {...props}>
          {item.icon}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent>{props.children}</SidebarFolderContent>
    </SidebarFolder>
  );
}

