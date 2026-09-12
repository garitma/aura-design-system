"use client";

/**
 * @description Measures available space and shows badges with an overflow indicator.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { useComposedRefs } from "@/utils/compose-refs";
import { cn } from "@/utils/class-names";

interface GetBadgeLabel<T> {
  /**
   * Returns a label string for each badge item.
   * Optional for primitive arrays (strings, numbers); required for object arrays.
   */
  getBadgeLabel: (item: T) => string;
}

type BadgeOverflowProps<T = string> = React.ComponentProps<"div"> &
  (T extends object ? GetBadgeLabel<T> : Partial<GetBadgeLabel<T>>) & {
    items: T[];
    /** How many lines of badges to show before overflowing. */
    lineCount?: number;
    renderBadge: (item: T, label: string) => React.ReactNode;
    renderOverflow?: (count: number) => React.ReactNode;
    asChild?: boolean;
  };

function BadgeOverflow<T = string>(props: BadgeOverflowProps<T>) {
  const {
    items,
    getBadgeLabel: getBadgeLabelProp,
    lineCount = 1,
    renderBadge,
    renderOverflow,
    asChild = false,
    className,
    style,
    ref,
    ...rootProps
  } = props;

  const getBadgeLabel = React.useCallback(
    (item: T): string => {
      if (typeof item === "object" && item !== null && !getBadgeLabelProp) {
        throw new Error(
          "`getBadgeLabel` is required when using an array of objects",
        );
      }
      return getBadgeLabelProp ? getBadgeLabelProp(item) : String(item);
    },
    [getBadgeLabelProp],
  );

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const composedRef = useComposedRefs(ref, rootRef);
  const measureRef = React.useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [badgeGap, setBadgeGap] = React.useState(4);
  const [badgeHeight, setBadgeHeight] = React.useState(20);
  const [overflowBadgeWidth, setOverflowBadgeWidth] = React.useState(40);
  const [isMeasured, setIsMeasured] = React.useState(false);
  const [badgeWidths, setBadgeWidths] = React.useState<Map<string, number>>(
    () => new Map(),
  );

  React.useLayoutEffect(() => {
    if (!rootRef.current || !measureRef.current) return;

    function measureContainer() {
      if (!rootRef.current || !measureRef.current) return;

      const computedStyle = getComputedStyle(rootRef.current);

      const gapValue = computedStyle.gap;
      const gap = gapValue ? Number.parseFloat(gapValue) : 4;
      setBadgeGap(Number.isFinite(gap) ? gap : 4);

      const paddingLeft = Number.parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = Number.parseFloat(computedStyle.paddingRight) || 0;
      const totalPadding = paddingLeft + paddingRight;

      const widthMap = new Map<string, number>();
      const measureChildren = measureRef.current.children;

      for (let i = 0; i < items.length; i++) {
        const child = measureChildren[i] as HTMLElement | undefined;
        if (child) {
          const label = getBadgeLabel(items[i] as T);
          widthMap.set(label, child.offsetWidth);
        }
      }
      setBadgeWidths(widthMap);

      const firstBadge = measureChildren[0] as HTMLElement | undefined;
      if (firstBadge) {
        setBadgeHeight(firstBadge.offsetHeight || 20);
      }

      const overflowChild = measureChildren[items.length] as
        | HTMLElement
        | undefined;
      if (overflowChild) {
        setOverflowBadgeWidth(overflowChild.offsetWidth || 40);
      }

      const width = rootRef.current.clientWidth - totalPadding;
      setContainerWidth(width);
      setIsMeasured(true);
    }

    measureContainer();

    const resizeObserver = new ResizeObserver(measureContainer);
    resizeObserver.observe(rootRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, getBadgeLabel]);

  const placeholderHeight = React.useMemo(
    () => badgeHeight * lineCount + badgeGap * (lineCount - 1),
    [badgeHeight, badgeGap, lineCount],
  );

  const { visibleItems, hiddenCount } = React.useMemo(() => {
    if (!containerWidth || items.length === 0 || badgeWidths.size === 0) {
      return { visibleItems: items, hiddenCount: 0 };
    }

    let currentLineWidth = 0;
    let currentLine = 1;
    const visible: T[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item === undefined || item === null) continue;

      const label = getBadgeLabel(item);
      const badgeWidth = badgeWidths.get(label);

      if (!badgeWidth) {
        continue;
      }

      const widthWithGap = badgeWidth + badgeGap;
      const isLastLine = currentLine === lineCount;
      const hasMoreItems = i < items.length - 1;

      const availableWidth =
        isLastLine && hasMoreItems
          ? containerWidth - overflowBadgeWidth - badgeGap
          : containerWidth;

      if (currentLineWidth + widthWithGap <= availableWidth) {
        currentLineWidth += widthWithGap;
        visible.push(item);
      } else if (currentLine < lineCount) {
        currentLine++;
        currentLineWidth = widthWithGap;
        visible.push(item);
      } else {
        break;
      }
    }

    return {
      visibleItems: visible,
      hiddenCount: Math.max(0, items.length - visible.length),
    };
  }, [
    items,
    getBadgeLabel,
    containerWidth,
    lineCount,
    badgeGap,
    overflowBadgeWidth,
    badgeWidths,
  ]);

  const Comp = asChild ? Slot : "div";

  const defaultOverflow = (count: number) => (
    <div className="inline-flex h-5 shrink-0 items-center rounded-full border border-gray-6 bg-gray-3 px-1.5 text-xs font-semibold text-gray-11">
      +{count}
    </div>
  );

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute flex flex-wrap"
        style={{ gap: badgeGap }}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {renderBadge(item, getBadgeLabel(item))}
          </React.Fragment>
        ))}
        {renderOverflow ? renderOverflow(99) : defaultOverflow(99)}
      </div>
      {isMeasured ? (
        <Comp
          data-slot="badge-overflow"
          {...rootProps}
          ref={composedRef}
          className={cn("flex flex-wrap", className)}
          style={{
            gap: badgeGap,
            ...style,
          }}
        >
          {visibleItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderBadge(item, getBadgeLabel(item))}
            </React.Fragment>
          ))}
          {hiddenCount > 0
            ? renderOverflow
              ? renderOverflow(hiddenCount)
              : defaultOverflow(hiddenCount)
            : null}
        </Comp>
      ) : (
        <Comp
          data-slot="badge-overflow"
          {...rootProps}
          ref={composedRef}
          className={cn("flex flex-wrap", className)}
          style={{
            gap: badgeGap,
            minHeight: placeholderHeight,
            ...style,
          }}
        >
          {items
            .slice(
              0,
              Math.min(items.length, lineCount * 3 - (lineCount > 1 ? 1 : 0)),
            )
            .map((item, index) => (
              <React.Fragment key={index}>
                {renderBadge(item, getBadgeLabel(item))}
              </React.Fragment>
            ))}
        </Comp>
      )}
    </>
  );
}

export { BadgeOverflow };
export type { BadgeOverflowProps };
