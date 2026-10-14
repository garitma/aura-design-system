"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils/class-names";

const breadcrumbFocus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-8";

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

type Crumb = {
  item: React.ReactElement;
  separator: React.ReactElement | null;
};

function isElement(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node);
}

function isSeparator(node: React.ReactNode): node is React.ReactElement {
  return isElement(node) && node.type === BreadcrumbSeparator;
}

function containsEllipsis(node: React.ReactNode): boolean {
  if (!isElement(node)) return false;
  if (node.type === BreadcrumbEllipsis) return true;
  const children = (node.props as { children?: React.ReactNode }).children;
  return React.Children.toArray(children).some(containsEllipsis);
}

function readCrumbs(children: React.ReactNode): Crumb[] {
  const nodes = React.Children.toArray(children);
  const crumbs: Crumb[] = [];

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (!isElement(node) || isSeparator(node)) continue;
    const next = nodes[index + 1];
    crumbs.push({
      item: node,
      separator: isSeparator(next) ? next : null,
    });
  }

  return crumbs;
}

function clonePart(
  node: React.ReactElement,
  props: React.ComponentProps<"li"> & { key?: React.Key },
) {
  const { key, ...rest } = props;
  const current = node.props as { className?: string };
  return React.cloneElement(node, {
    ...rest,
    key,
    className: cn(current.className, rest.className),
  });
}

function separatorNode(
  source: React.ReactElement | null,
  props?: React.ComponentProps<"li"> & { key?: React.Key },
) {
  if (!source) return <BreadcrumbSeparator {...props} />;
  return clonePart(source, props ?? {});
}

function BreadcrumbList({
  className,
  maxItems,
  ellipsis,
  children,
  ...props
}: React.ComponentProps<"ol"> & {
  maxItems?: number;
  ellipsis?: React.ReactNode;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const crumbs = readCrumbs(children);
  const forceCollapse =
    typeof maxItems === "number" &&
    maxItems >= 1 &&
    crumbs.length > maxItems &&
    crumbs.length >= 2;
  const responsiveCollapse =
    !forceCollapse &&
    !expanded &&
    crumbs.length > 2 &&
    !containsEllipsis(children);

  const ellipsisNode =
    ellipsis ??
    (forceCollapse ? (
      <BreadcrumbEllipsis />
    ) : (
      <button
        type="button"
        className={cn(
          "small inline-flex items-center border-0 bg-transparent p-0 text-gray-11",
          breadcrumbFocus,
        )}
        aria-expanded={expanded}
        aria-label="Show more breadcrumbs"
        onClick={() => setExpanded(true)}
      >
        <BreadcrumbEllipsis />
      </button>
    ));

  let content: React.ReactNode = children;

  if ((forceCollapse || responsiveCollapse) && crumbs.length >= 2) {
    const first = crumbs[0];
    const last = crumbs[crumbs.length - 1];
    const middle = crumbs.slice(1, -1);

    content = (
      <>
        {first.item}
        {separatorNode(first.separator)}
        <BreadcrumbItem data-breadcrumb="ellipsis">
          {ellipsisNode}
        </BreadcrumbItem>
        {separatorNode(first.separator, {
          key: "breadcrumb-after-ellipsis",
          ...(responsiveCollapse ? { "data-breadcrumb": "ellipsis" as const } : {}),
        })}
        {responsiveCollapse
          ? middle.map((crumb) => (
              <React.Fragment key={crumb.item.key}>
                {clonePart(crumb.item, { "data-breadcrumb": "middle" })}
                {crumb.separator
                  ? separatorNode(crumb.separator, {
                      "data-breadcrumb": "middle",
                    })
                  : null}
              </React.Fragment>
            ))
          : null}
        {last.item}
      </>
    );
  }

  return (
    <ol
      data-slot="breadcrumb-list"
      data-collapse={responsiveCollapse ? "sm" : undefined}
      data-expanded={expanded ? "true" : undefined}
      className={cn(
        "small flex flex-wrap items-center gap-0.5 text-gray-11",
        className,
      )}
      {...props}
    >
      {content}
    </ol>
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "small text-gray-11 transition-colors hover:text-gray-12 hover:underline underline-offset-2",
        breadcrumbFocus,
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("small font-semibold text-gray-12", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="icon rtl:rotate-180" />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex size-2 items-center justify-center",
        className,
      )}
      {...props}
    >
      <DotsHorizontalIcon className="icon" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
