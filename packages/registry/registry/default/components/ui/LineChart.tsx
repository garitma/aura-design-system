"use client";
import * as React from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { CartesianGrid, LabelList, LineChart as RechartsLineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartLine,
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

export const lineChartVariants = [
  "default",
  "linear",
  "step",
  "multiple",
  "dots",
  "custom",
  "label",
  "interactive",
] as const;

export type LineChartVariant = (typeof lineChartVariants)[number];

const monthVisitors = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const interactiveVisitors = Array.from({ length: 90 }, (_, index) => {
  const date = new Date(Date.UTC(2024, 3, 1 + index));
  const desktop = Math.round(220 + Math.sin(index / 5) * 160 + (index % 7) * 8);
  const mobile = Math.round(140 + Math.cos(index / 6) * 90 + (index % 5) * 6);
  return {
    date: date.toISOString().slice(0, 10),
    desktop: Math.max(desktop, 24),
    mobile: Math.max(mobile, 24),
  };
});

const titles: Record<LineChartVariant, string> = {
  default: "Line chart",
  linear: "Line chart — linear",
  step: "Line chart — step",
  multiple: "Line chart — multiple",
  dots: "Line chart — dots",
  custom: "Line chart — custom dots",
  label: "Line chart — label",
  interactive: "Line chart — interactive",
};

const curves = {
  default: "natural",
  linear: "linear",
  step: "step",
  multiple: "natural",
  dots: "natural",
  custom: "natural",
  label: "natural",
  interactive: "natural",
} as const;

const rangeCopy = {
  "90d": "the last 3 months",
  "30d": "the last 30 days",
  "7d": "the last 7 days",
} as const;

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

function seriesKeys(variant: LineChartVariant) {
  if (variant === "multiple" || variant === "interactive") {
    return ["desktop", "mobile"] as const;
  }
  return ["desktop"] as const;
}

function LineChart({
  variant = "default",
  className,
}: {
  variant?: LineChartVariant;
  className?: string;
}) {
  const [timeRange, setTimeRange] = React.useState<keyof typeof rangeCopy>("90d");
  const title = titles[variant];
  const keys = seriesKeys(variant);
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
              <Select
                value={timeRange}
                onValueChange={(value) => setTimeRange(value as keyof typeof rangeCopy)}
              >
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
        <ChartContainer config={chartConfig} label={title}>
          <RechartsLineChart
            accessibilityLayer
            data={plotted}
            margin={chartPlotMargin(
              variant === "label" ? { top: chartTickMargin() * 2 } : undefined
            )}
          >
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
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
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
              <ChartLine
                key={key}
                dataKey={key}
                type={curves[variant]}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={
                  variant === "dots" || variant === "custom"
                    ? {
                        r: 4,
                        fill: variant === "custom" ? "var(--gray-1)" : `var(--color-${key})`,
                        stroke: `var(--color-${key})`,
                        strokeWidth: 2,
                      }
                    : false
                }
              >
                {variant === "label" && key === "desktop" ? (
                  <LabelList
                    dataKey="desktop"
                    position="top"
                    offset={chartTickMargin() / 2}
                    fontSize="var(--chart-tick-size, var(--spacing))"
                    fill="var(--chart-tick, var(--gray-11))"
                  />
                ) : null}
              </ChartLine>
            ))}
            {variant === "multiple" || variant === "interactive" ? (
              <ChartLegend content={<ChartLegendContent />} />
            ) : null}
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
      {variant === "interactive" ? null : (
        <CardFooter>
          <div className="grid gap-0.5">
            <div className="flex items-center gap-0.5 text-sm font-medium text-gray-12">
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

export { LineChart };
