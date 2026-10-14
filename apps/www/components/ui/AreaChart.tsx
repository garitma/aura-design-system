"use client";
import * as React from "react";
import {
  ActivityLogIcon,
  ArrowUpIcon,
  DesktopIcon,
  MobileIcon,
} from "@radix-ui/react-icons";
import { AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ChartArea,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  chartAxisTick,
  chartPlotMargin,
  chartTickMargin,
  type ChartConfig,
} from "@/components/ui/Chart";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "@/components/ui/Select";
import { cn } from "@/utils/class-names";

export const areaChartVariants = [
  "default",
  "linear",
  "step",
  "stacked",
  "expanded",
  "legend",
  "icons",
  "gradient",
  "axes",
  "interactive",
] as const;

export type AreaChartVariant = (typeof areaChartVariants)[number];

const monthVisitors = [
  { month: "January", desktop: 186, mobile: 80, other: 45 },
  { month: "February", desktop: 305, mobile: 200, other: 100 },
  { month: "March", desktop: 237, mobile: 120, other: 150 },
  { month: "April", desktop: 73, mobile: 190, other: 50 },
  { month: "May", desktop: 209, mobile: 130, other: 100 },
  { month: "June", desktop: 214, mobile: 140, other: 160 },
];

const interactiveVisitors = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const titles: Record<AreaChartVariant, string> = {
  default: "Area chart",
  linear: "Area chart — linear",
  step: "Area chart — step",
  stacked: "Area chart — stacked",
  expanded: "Area chart — expanded",
  legend: "Area chart — legend",
  icons: "Area chart — icons",
  gradient: "Area chart — gradient",
  axes: "Area chart — axes",
  interactive: "Area chart — interactive",
};

const curves = {
  default: "natural",
  linear: "linear",
  step: "step",
  stacked: "natural",
  expanded: "natural",
  legend: "natural",
  icons: "natural",
  gradient: "natural",
  axes: "natural",
  interactive: "natural",
} as const;

const rangeCopy = {
  "90d": "the last 3 months",
  "30d": "the last 30 days",
  "7d": "the last 7 days",
} as const;

function seriesKeys(variant: AreaChartVariant) {
  if (variant === "expanded") return ["other", "mobile", "desktop"] as const;
  if (variant === "default" || variant === "linear" || variant === "step") {
    return ["desktop"] as const;
  }
  return ["mobile", "desktop"] as const;
}

function buildConfig(variant: AreaChartVariant): ChartConfig {
  return {
    visitors: { label: "Visitors" },
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
      icon:
        variant === "icons"
          ? DesktopIcon
          : variant === "step"
            ? ActivityLogIcon
            : undefined,
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
      icon: variant === "icons" ? MobileIcon : undefined,
    },
    other: {
      label: "Other",
      color: "var(--chart-3)",
    },
  };
}

function AreaChart({
  variant = "default",
  className,
}: {
  variant?: AreaChartVariant;
  className?: string;
}) {
  const [timeRange, setTimeRange] = React.useState<keyof typeof rangeCopy>("90d");
  const gradientId = React.useId().replace(/:/g, "");
  const stacked = !["default", "linear", "step"].includes(variant);
  const gradient = variant === "gradient" || variant === "interactive";
  const keys = seriesKeys(variant);
  const config = buildConfig(variant);
  const title = titles[variant];

  const plotted =
    variant === "interactive"
      ? interactiveVisitors.filter((item) => {
          const date = new Date(item.date);
          const start = new Date("2024-06-30");
          const days = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
          start.setDate(start.getDate() - days);
          return date >= start;
        })
      : monthVisitors;

  const description =
    variant === "interactive"
      ? `Showing total visitors for ${rangeCopy[timeRange]}`
      : "Showing total visitors for the last 6 months";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        {variant === "interactive" ? (
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="grid gap-0.5">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="w-14">
              <Select value={timeRange} onValueChange={(value) => setTimeRange(value as keyof typeof rangeCopy)}>
                <SelectTrigger aria-label="Time range">
                  <SelectValue placeholder="Last 3 months" />
                  <SelectIcon />
                </SelectTrigger>
                <SelectContent>
                  <SelectViewport>
                    <SelectItem value="90d">
                      <SelectItemText>Last 3 months</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                    <SelectItem value="30d">
                      <SelectItemText>Last 30 days</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                    <SelectItem value="7d">
                      <SelectItemText>Last 7 days</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  </SelectViewport>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} label={title}>
          <RechartsAreaChart
            accessibilityLayer
            data={plotted}
            margin={chartPlotMargin(variant === "axes" ? { left: 0 } : undefined)}
            stackOffset={variant === "expanded" ? "expand" : "none"}
          >
            {gradient ? (
              <defs>
                {keys.map((key) => (
                  <linearGradient
                    key={key}
                    id={`${gradientId}-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
            ) : null}
            <CartesianGrid vertical={false} stroke="var(--chart-grid, var(--gray-6))" />
            <XAxis
              dataKey={variant === "interactive" ? "date" : "month"}
              tickLine={false}
              axisLine={false}
              tickMargin={chartTickMargin()}
              interval="preserveStartEnd"
              minTickGap={variant === "interactive" ? chartTickMargin() * 2 : 0}
              tick={chartAxisTick}
              tickFormatter={(value: string) => {
                if (variant === "interactive") {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }
                return value.slice(0, 3);
              }}
            />
            {variant === "axes" ? (
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={chartTickMargin()}
                interval="preserveStartEnd"
                tickCount={3}
                tick={chartAxisTick}
              />
            ) : null}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator={
                    variant === "default" || variant === "expanded" ? "line" : "dot"
                  }
                  hideLabel={variant === "step"}
                  labelFormatter={
                    variant === "interactive"
                      ? (value) =>
                          new Date(String(value)).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                      : undefined
                  }
                />
              }
            />
            {keys.map((key) => (
              <ChartArea
                key={key}
                dataKey={key}
                type={curves[variant]}
                fill={gradient ? `url(#${gradientId}-${key})` : `var(--color-${key})`}
                fillOpacity={
                  variant === "interactive" ? 1 : key === "other" ? 0.1 : 0.4
                }
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                stackId={stacked ? "a" : undefined}
              />
            ))}
            {variant === "legend" || variant === "icons" || variant === "interactive" ? (
              <ChartLegend content={<ChartLegendContent />} />
            ) : null}
          </RechartsAreaChart>
        </ChartContainer>
      </CardContent>
      {variant === "interactive" ? null : (
        <CardFooter>
          <div className="grid gap-0.5">
            <div className="flex items-center gap-0.5 font-medium text-sm text-gray-12">
              Trending up by 5.2% this month
              <ArrowUpIcon className="icon" />
            </div>
            <p className="text-sm text-gray-11">January – June 2024</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export { AreaChart };
