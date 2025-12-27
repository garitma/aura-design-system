import { type HTMLAttributes, useMemo } from "react";
import { ChevronDown, Languages } from "lucide-react";
import Link from "fumadocs-core/link";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import type * as PageTree from "fumadocs-core/page-tree";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";

import { cn } from "@/utils/class-names";

import {
  LanguageToggle,
  LanguageToggleText,
} from "@/components/LanguageToggle";

import { ThemeToggle } from "@/components/ThemeToggle";
import {
  SearchDialogTrigger,
  SearchDialogTriggerIcon,
} from "@/components/SearchDialog";
import {
  Sidebar,
  SidebarPageTree,
} from "@/components/Sidebar";
import {
  MobileNavigationMenuContent,
  MobileNavigationMenuLinkItem,
  MobileNavigationMenuTrigger,
  Navbar,
  NavigationMenuItem,
  NavigationMenuLinkItem,
} from "@/components/layout/home/client";
import {
  type BaseLayoutProps,
  getLinks,
  type LinkItemType,
  type NavOptions,
} from "@/components/layout/shared/index";
import { buttonVariants } from "@/components/ui/Button";

export interface HomeLayoutProps extends BaseLayoutProps {
  nav?: Partial<
    NavOptions & {
      /**
       * Open mobile menu when hovering the trigger
       */
      enableHoverToOpen?: boolean;
    }
  >;
  /**
   * Page tree for sidebar navigation (used in mobile menu)
   */
  tree?: PageTree.Root;
}

export function HomeLayout(
  props: HomeLayoutProps & HTMLAttributes<HTMLElement>
) {
  const {
    nav = {},
    links,
    githubUrl,
    i18n,
    themeSwitch = {},
    searchToggle,
    tree,
    ...rest
  } = props;

  const content = (
    <NavProvider transparentMode={nav?.transparentMode}>
      <main
        id="nd-home-layout"
        {...rest}
        className={cn("flex flex-1 flex-col pt-4.5", rest.className)}
      >
        {nav.enabled !== false &&
          (nav.component ?? (
            <Header
              links={links}
              nav={nav}
              themeSwitch={themeSwitch}
              searchToggle={searchToggle}
              i18n={i18n}
              githubUrl={githubUrl}
              tree={tree}
            />
          ))}
        {props.children}
      </main>
    </NavProvider>
  );

  if (tree) {
    return (
      <TreeContextProvider tree={tree}>
        {content}
      </TreeContextProvider>
    );
  }

  return content;
}

export function Header({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch = {},
  searchToggle = {},
  tree,
}: HomeLayoutProps) {
  const finalLinks = useMemo(
    () => getLinks(links, githubUrl),
    [links, githubUrl]
  );

  const navItems = finalLinks.filter((item) =>
    ["nav", "all"].includes(item.on ?? "all")
  );
  const menuItems = finalLinks.filter((item) =>
    ["menu", "all"].includes(item.on ?? "all")
  );

  return (
    <Navbar>
      <Link
        href={nav.url ?? "/"}
        className="inline-flex items-center gap-1 font-semibold"
      >
        {nav.title}
      </Link>
      {nav.children}
      <ul className="flex flex-row items-center gap-0.5 px-2 max-sm:hidden">
        {navItems
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavigationMenuLinkItem key={i} item={item} className="text-sm" />
          ))}
      </ul>
      <div className="flex flex-row items-center justify-end gap-0.5 flex-1 max-lg:hidden">
        <SearchDialogTrigger />

        {themeSwitch.enabled !== false &&
          (themeSwitch.component ?? <ThemeToggle mode={themeSwitch?.mode} />)}
        {i18n && (
          <LanguageToggle>
            <Languages className="size-1.5" />
          </LanguageToggle>
        )}
        <ul className="flex flex-row gap-0.5 items-center empty:hidden">
          {navItems.filter(isSecondary).map((item, i) => (
            <NavigationMenuLinkItem
              key={i}
              className={cn(
                item.type === "icon" && "-mx-0.5 first:ms-0 last:me-0"
              )}
              item={item}
            />
          ))}
        </ul>
      </div>
      <ul className="flex flex-row items-center ms-auto lg:hidden gap-0.5">
        <SearchDialogTriggerIcon />

        {(tree || menuItems.length > 0) && (
          <NavigationMenuItem>
            <MobileNavigationMenuTrigger
              aria-label="Toggle Menu"
              className={cn(
                buttonVariants({
                  variant: "pill",
                  className: "group",
                  size: "icon",
                })
              )}
              enableHover={nav.enableHoverToOpen}
            >
              <ChevronDown className="icon transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </MobileNavigationMenuTrigger>
            <MobileNavigationMenuContent className="flex flex-col gap-1">
              {tree ? (
                <Sidebar
                  defaultOpenLevel={1}
                  prefetch={true}
                  Content={
                    <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                      <SidebarPageTree />
                    </div>
                  }
                />
              ) : (
                <>
                  {menuItems
                    .filter((item) => !isSecondary(item))
                    .map((item, i) => (
                      <MobileNavigationMenuLinkItem
                        key={i}
                        item={item}
                        className="sm:hidden"
                      />
                    ))}
                </>
              )}

              <div className="flex flex-row gap-1 mt-1">
                {!tree &&
                  menuItems.filter(isSecondary).map((item, i) => (
                    <MobileNavigationMenuLinkItem
                      key={i}
                      item={item}
                      className={cn(item.type === "icon" && "first:ms-0")}
                    />
                  ))}

                {i18n && (
                  <LanguageToggle>
                    <Languages className="size-5" />
                    <LanguageToggleText />
                    <ChevronDown className="size-1 text-fd-muted-foreground" />
                  </LanguageToggle>
                )}
                {themeSwitch.enabled !== false &&
                  (themeSwitch.component ?? (
                    <ThemeToggle mode={themeSwitch?.mode} />
                  ))}
              </div>
            </MobileNavigationMenuContent>
          </NavigationMenuItem>
        )}
      </ul>
    </Navbar>
  );
}

function isSecondary(item: LinkItemType): boolean {
  if ("secondary" in item && item.secondary != null) return item.secondary;

  return item.type === "icon";
}
