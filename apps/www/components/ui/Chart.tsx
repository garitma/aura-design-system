"use client";
/**
 * @description Chart container, tooltip, legend, and series wrappers for Recharts, colored with Aura series tokens.
 */
import * as React from "react";
import {
  Area,
  Bar,
  Legend,
  Line,
  Pie,
  Radar,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { cn } from "@/utils/class-names";

const THEMES = { light: "", dark: ".dark" } as const;

type SeriesColor = {
  color?: string;
  theme?: never;
} | {
  color?: never;
  theme: Partial<Record<keyof typeof THEMES, string>>;
};

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  } & SeriesColor;
};

type ChartTooltipItem = {
  type?: string;
  dataKey?: string | number;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown> & { fill?: string };
  fill?: string;
};

type ChartContextValue = {
  config: ChartConfig;
  reducedMotion: boolean;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const VAR_COLOR =
  /^var\(--[a-zA-Z0-9_-]+(?:\s*,\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\)$/;
const HEX_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const NAMED_COLOR = /^[a-zA-Z]+$/;
const FUNC_COLOR =
  /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix)\((?:[^()]|\([^()]*\))+\)$/;

function isSafeChartColor(value: string) {
  if (/[;{}\\]|url\s*\(|\/\*|\*\//i.test(value)) return false;
  return (
    VAR_COLOR.test(value) ||
    HEX_COLOR.test(value) ||
    NAMED_COLOR.test(value) ||
    FUNC_COLOR.test(value)
  );
}

function tokenColor(color: string | undefined) {
  if (!color) return undefined;
  const value = color.trim();
  if (!value) return undefined;
  if (isSafeChartColor(value)) return value;
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[chart] Ignored color "${value}". Use a var(--token), hex, rgb(), hsl(), or a CSS named color.`
    );
  }
  return undefined;
}

const CHART_INSET_FALLBACK = 13;
let chartInsetCache: number | undefined;

function measureCssPx(expression: string, fallback: number) {
  if (typeof document === "undefined") return fallback;
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.inlineSize = expression;
  document.documentElement.appendChild(probe);
  const width = probe.getBoundingClientRect().width;
  probe.remove();
  return Number.isFinite(width) && width > 0 ? width : fallback;
}

/** Pixel size of `--chart-inset`, which follows `--spacing`. */
function chartInsetPx() {
  if (chartInsetCache != null) return chartInsetCache;
  const value = measureCssPx(
    "var(--chart-inset, var(--spacing, 13px))",
    CHART_INSET_FALLBACK
  );
  if (typeof document !== "undefined") chartInsetCache = value;
  return value;
}

function chartTickMargin() {
  return chartInsetPx();
}

function chartPlotMargin(overrides?: {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}) {
  const inset = chartInsetPx();
  return {
    top: inset,
    right: inset,
    left: inset,
    bottom: 0,
    ...overrides,
  };
}

const chartAxisTick = {
  fill: "var(--chart-tick, var(--gray-11))",
  fontSize: "var(--chart-tick-size, var(--spacing))",
};

function ChartContainer({
  id,
  className,
  children,
  config,
  label,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof ResponsiveContainer>["children"];
  label?: string;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <ChartContext.Provider value={{ config, reducedMotion }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-square w-full justify-center text-xs text-gray-11 sm:aspect-video",
          className
        )}
        aria-label={label}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer minWidth={0}>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.theme || item.color
  );

  if (!colorConfig.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const lines = colorConfig
        .map(([key, item]) => {
          const color =
            tokenColor(
              item.theme?.[theme as keyof typeof item.theme] || item.color
            ) ?? undefined;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");
      if (!lines) return "";
      return `${prefix} [data-chart=${id}] {\n${lines}\n}`;
    })
    .filter(Boolean)
    .join("\n");

  if (!css) return null;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const ChartTooltip = Tooltip;

function formatChartValue(value: number | string | undefined) {
  if (value == null || value === "") return null;
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(numeric)) return numeric.toLocaleString();
  return String(value);
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: {
  active?: boolean;
  payload?: ChartTooltipItem[];
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  label?: React.ReactNode;
  labelFormatter?: (
    value: React.ReactNode,
    payload: ChartTooltipItem[]
  ) => React.ReactNode;
  labelClassName?: string;
  formatter?: (
    value: number | string,
    name: string,
    item: ChartTooltipItem,
    index: number,
    payload: Record<string, unknown>
  ) => React.ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
}) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? config[label]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium text-gray-12", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) return null;

    return <div className={cn("font-medium text-gray-12", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-10 items-start gap-0.5 rounded-sm border border-gray-6 bg-gray-1 px-1 py-0.5 text-xs text-gray-12",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-0.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload?.fill || item.color;
            const Icon = itemConfig?.icon;
            const formatted = formatChartValue(item.value);

            return (
              <div
                key={String(item.dataKey)}
                className={cn(
                  "flex w-full items-center gap-0.5",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item.value != null && item.name ? (
                  formatter(
                    item.value,
                    item.name,
                    item,
                    index,
                    item.payload ?? {}
                  )
                ) : (
                  <>
                    {Icon ? (
                      <Icon className="icon" />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-full",
                            indicator === "dashed" &&
                              "w-0 border border-dashed bg-transparent"
                          )}
                          style={
                            {
                              width:
                                indicator === "dot"
                                  ? "var(--chart-marker, 8px)"
                                  : indicator === "line"
                                    ? "var(--chart-marker-line, 2px)"
                                    : undefined,
                              height: "var(--chart-marker, 8px)",
                              backgroundColor:
                                indicator === "dashed" ? "transparent" : indicatorColor,
                              borderColor: indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between gap-1 leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-0.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-gray-11">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {formatted ? (
                        <span className="font-mono font-medium tabular-nums text-gray-12">
                          {formatted}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  payload?: Array<{
    type?: string;
    dataKey?: string | number;
    value?: string;
    color?: string;
  }>;
  verticalAlign?: "top" | "bottom" | "middle";
  nameKey?: string;
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 text-xs text-gray-12",
        verticalAlign === "top" ? "pb-1" : "pt-1",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const Icon = itemConfig?.icon;
          const swatch =
            item.color && !String(item.color).startsWith("url")
              ? item.color
              : `var(--color-${key})`;

          return (
            <div key={String(item.value)} className="flex items-center gap-0.5">
              {Icon && !hideIcon ? (
                <Icon className="icon" />
              ) : (
                <div
                  className="shrink-0 rounded-full"
                  style={{
                    width: "var(--chart-marker, 8px)",
                    height: "var(--chart-marker, 8px)",
                    backgroundColor: swatch,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

type SeriesSource = {
  displayName?: string;
  defaultProps?: object;
  getComposedData?: (...args: never[]) => unknown;
};

function useChartMotion(isAnimationActive?: boolean, animationDuration = 250) {
  const { reducedMotion } = useChart();

  return {
    animationDuration,
    animationEasing: "ease-out" as const,
    isAnimationActive: isAnimationActive ?? !reducedMotion,
  };
}

function bindRechartsSeries(
  component: object,
  source: SeriesSource,
  displayName: string,
) {
  const bound: Record<string, unknown> = { displayName };
  if (source.defaultProps) bound.defaultProps = source.defaultProps;
  if (typeof source.getComposedData === "function") {
    bound.getComposedData = source.getComposedData;
  }
  Object.assign(component, bound);
}

function ChartArea({
  isAnimationActive,
  animationDuration = 250,
  ...props
}: Omit<React.ComponentProps<typeof Area>, "ref">) {
  return <Area {...props} {...useChartMotion(isAnimationActive, animationDuration)} />;
}

function ChartBar({
  isAnimationActive,
  animationDuration = 250,
  ...props
}: Omit<React.ComponentProps<typeof Bar>, "ref">) {
  return <Bar {...props} {...useChartMotion(isAnimationActive, animationDuration)} />;
}

function ChartLine({
  isAnimationActive,
  animationDuration = 250,
  ...props
}: Omit<React.ComponentProps<typeof Line>, "ref">) {
  return <Line {...props} {...useChartMotion(isAnimationActive, animationDuration)} />;
}

function ChartPie({
  isAnimationActive,
  animationDuration = 250,
  ...props
}: Omit<React.ComponentProps<typeof Pie>, "ref">) {
  return <Pie {...props} {...useChartMotion(isAnimationActive, animationDuration)} />;
}

function ChartRadar({
  isAnimationActive,
  animationDuration = 250,
  ...props
}: Omit<React.ComponentProps<typeof Radar>, "ref">) {
  return <Radar {...props} {...useChartMotion(isAnimationActive, animationDuration)} />;
}

function ChartRadialBar({
  isAnimationActive,
  animationDuration = 250,
  ...props
}: Omit<React.ComponentProps<typeof RadialBar>, "ref">) {
  return (
    <RadialBar {...props} {...useChartMotion(isAnimationActive, animationDuration)} />
  );
}

// Recharts identifies a series by displayName, reads axis ids from defaultProps,
// and skips a composed child that does not implement getComposedData.
bindRechartsSeries(ChartArea, Area, "Area");
bindRechartsSeries(ChartBar, Bar, "Bar");
bindRechartsSeries(ChartLine, Line, "Line");
bindRechartsSeries(ChartPie, Pie, "Pie");
bindRechartsSeries(ChartRadar, Radar, "Radar");
bindRechartsSeries(ChartRadialBar, RadialBar, "RadialBar");

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined;

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartArea,
  ChartBar,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartLine,
  ChartPie,
  ChartRadar,
  ChartRadialBar,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  chartAxisTick,
  chartPlotMargin,
  chartTickMargin,
  useChart,
};
