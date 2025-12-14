import {
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
  useMemo,
} from "react";
import { Languages, Sidebar as SidebarIcon } from "lucide-react";
import Link from "fumadocs-core/link";
import type * as PageTree from "fumadocs-core/page-tree";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import {
  getSidebarTabs,
  type GetSidebarTabsOptions,
} from "fumadocs-ui/utils/get-sidebar-tabs";
import { cn } from "@/utils/class-names";

import {
  LanguageToggle,
  LanguageToggleText,
} from "@/components/LanguageToggle";
import { type Option, RootToggle } from "@/components/RootToggle";
import { LargeSearchToggle, SearchToggle } from "@/components/SearchToggle";
import { SearchDialogTrigger, SearchDialogTriggerIcon } from "@/components/SearchDialog";
import {
  Sidebar,
  SidebarCollapseTrigger,
  type SidebarComponents,
  SidebarContent,
  SidebarContentMobile,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarPageTree,
  type SidebarProps,
  SidebarTrigger,
  SidebarViewport,
} from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/Button";
import {
  CollapsibleControl,
  LayoutBody,
  LayoutTabs,
  Navbar,
} from "@/components/layout/docs/client";
import {
  type BaseLayoutProps,
  BaseLinkItem,
  getLinks,
  type LinkItemType,
} from "@/components/layout/shared/index";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;

  sidebar?: SidebarOptions;

  tabMode?: "top" | "auto";

  /**
   * Props for the `div` container
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

interface SidebarOptions
  extends ComponentProps<"aside">,
    Pick<SidebarProps, "defaultOpenLevel" | "prefetch"> {
  enabled?: boolean;
  component?: ReactNode;
  components?: Partial<SidebarComponents>;

  /**
   * Root Toggle options
   */
  tabs?: Option[] | GetSidebarTabsOptions | false;

  banner?: ReactNode;
  footer?: ReactNode;

  /**
   * Support collapsing the sidebar on desktop mode
   *
   * @defaultValue true
   */
  collapsible?: boolean;
}

export function DocsLayout({
  nav: { transparentMode, ...nav } = {},
  sidebar: {
    tabs: sidebarTabs,
    enabled: sidebarEnabled = true,
    ...sidebarProps
  } = {},
  searchToggle = {},
  themeSwitch = {},
  tabMode = "auto",
  i18n = false,
  children,
  tree,
  ...props
}: DocsLayoutProps) {
  const tabs = useMemo(() => {
    if (Array.isArray(sidebarTabs)) {
      return sidebarTabs;
    }
    if (typeof sidebarTabs === "object") {
      return getSidebarTabs(tree, sidebarTabs);
    }
    if (sidebarTabs !== false) {
      return getSidebarTabs(tree);
    }
    return [];
  }, [tree, sidebarTabs]);
  const links = getLinks(props.links ?? [], props.githubUrl);
  const sidebarVariables = cn(
    "md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px] xl:[--fd-toc-width:268px]"
  );

  function sidebar() {
    const {
      footer,
      banner,
      collapsible = true,
      component,
      components,
      defaultOpenLevel,
      prefetch,
      ...rest
    } = sidebarProps;
    if (component) return component;

    const iconLinks = links.filter((item) => item.type === "icon");

    const viewport = (
      <SidebarViewport>
        {links
          .filter((v) => v.type !== "icon")
          .map((item, i, list) => (
            <SidebarLinkItem
              key={i}
              item={item}
              className={cn(i === list.length - 1 && "mb-1")}
            />
          ))}
        <SidebarPageTree components={components} />
      </SidebarViewport>
    );

    const mobile = (
      <SidebarContentMobile {...rest}>
        <SidebarHeader>
          <div className="flex text-fd-muted-foreground items-center gap-0.5">
            <div className="flex flex-1">
              {iconLinks.map((item, i) => (
                <BaseLinkItem
                  key={i}
                  item={item}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "pill",
                      className: "p-0.5 size-3",
                    })
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </BaseLinkItem>
              ))}
            </div>
            {i18n ? (
              <LanguageToggle>
                <Languages className="size-1.5" />
                <LanguageToggleText />
              </LanguageToggle>
            ) : null}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle className="p-0" mode={themeSwitch.mode} />
              ))}
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  variant: "pill",
                  size: "sm",
                  className: "p-0.5 size-3",
                })
              )}
            >
              <SidebarIcon className="icon" />
            </SidebarTrigger>
          </div>
          {tabs.length > 0 && <RootToggle options={tabs} />}
          {banner}
        </SidebarHeader>
        {viewport}
        <SidebarFooter className="empty:hidden">{footer}</SidebarFooter>
      </SidebarContentMobile>
    );

    const content = (
      <SidebarContent {...rest}>
        <SidebarHeader>
          <div className="flex">
            <Link
              href={nav.url ?? "/"}
              className="inline-flex items-center gap-1 font-medium me-auto"
            >
              {nav.title}
            </Link>
            {nav.children}
            {collapsible && (
              <SidebarCollapseTrigger
                className={cn(
                  buttonVariants({
                    variant: "pill",
                    size: "sm",
                    className: "p-0.5 size-3",
                  })
                )}
              >
                <SidebarIcon className="icon" />
              </SidebarCollapseTrigger>
            )}
          </div>
          <SearchDialogTrigger />
          {searchToggle.enabled !== false &&
            (searchToggle.components?.lg ?? (
              <LargeSearchToggle hideIfDisabled />
            ))}
          {tabs.length > 0 && tabMode === "auto" && (
            <RootToggle options={tabs} />
          )}
          {banner}
        </SidebarHeader>
        {viewport}
        {(i18n ||
          iconLinks.length > 0 ||
          themeSwitch?.enabled !== false ||
          footer) && (
          <SidebarFooter>
            <div className="flex text-fd-muted-foreground items-center empty:hidden justify-start gap-1">
              {i18n && (
                <LanguageToggle>
                  <Languages className="size-4.5" />
                </LanguageToggle>
              )}
              {iconLinks.map((item, i) => (
                <BaseLinkItem
                  key={i}
                  item={item}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "pill",
                      className: "p-0.5 size-3",
                    })
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </BaseLinkItem>
              ))}
              {themeSwitch.enabled !== false &&
                (themeSwitch.component ?? (
                  <ThemeToggle
                    className="ms-auto p-0"
                    mode={themeSwitch.mode}
                  />
                ))}
            </div>
            {footer}
          </SidebarFooter>
        )}
      </SidebarContent>
    );

    return (
      <Sidebar
        defaultOpenLevel={defaultOpenLevel}
        prefetch={prefetch}
        Mobile={mobile}
        Content={
          <>
            {collapsible && <CollapsibleControl />}
            {content}
          </>
        }
      />
    );
  }

  return (
    <TreeContextProvider tree={tree}>
      <NavProvider transparentMode={transparentMode}>
        {nav.enabled !== false &&
          (nav.component ?? (
            <Navbar className="h-(--fd-nav-height) on-root:[--fd-nav-height:56px] md:on-root:[--fd-nav-height:0px] md:hidden">
              <Link
                href={nav.url ?? "/"}
                className="inline-flex items-center gap-2.5 font-semibold"
              >
                {nav.title}
              </Link>
              <div className="flex-1">{nav.children}</div>
              <SearchDialogTriggerIcon />
              {searchToggle.enabled !== false &&
                (searchToggle.components?.sm ?? (
                  <SearchToggle className="p-2" hideIfDisabled />
                ))}
              {sidebarEnabled && (
                <SidebarTrigger
                  className={cn(
                    buttonVariants({
                      variant: "pill",
                      size: "sm",
                      className: "p-0.5 size-3",
                    })
                  )}
                >
                  <SidebarIcon className="icon" />
                </SidebarTrigger>
              )}
            </Navbar>
          ))}
        <LayoutBody
          {...props.containerProps}
          className={cn(
            "md:[&_#nd-page_article]:pt-1.5 xl:[&_#nd-page_article]:px-2.5",
            sidebarEnabled && sidebarVariables,
            props.containerProps?.className
          )}
        >
          {sidebarEnabled && sidebar()}
          {tabMode === "top" && tabs.length > 0 && (
            <LayoutTabs
              options={tabs}
              className="sticky top-[calc(var(--fd-nav-height)+var(--fd-tocnav-height))] z-10 bg-fd-background border-b px-2 pt-3 xl:px-8 max-md:hidden"
            />
          )}
          {children}
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  );
}

function SidebarLinkItem({
  item,
  ...props
}: {
  item: Exclude<LinkItemType, { type: "icon" }>;
  className?: string;
}) {
  if (item.type === "menu")
    return (
      <SidebarFolder {...props}>
        {item.url ? (
          <SidebarFolderLink href={item.url} external={item.external}>
            {item.icon}
            {item.text}
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            {item.icon}
            {item.text}
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>
          {item.items.map((child, i) => (
            <SidebarLinkItem key={i} item={child} />
          ))}
        </SidebarFolderContent>
      </SidebarFolder>
    );

  if (item.type === "custom") return <div {...props}>{item.children}</div>;

  return (
    <SidebarItem
      href={item.url}
      icon={item.icon}
      external={item.external}
      {...props}
    >
      {item.text}
    </SidebarItem>
  );
}

export { CollapsibleControl, Navbar, SidebarTrigger, type LinkItemType };
