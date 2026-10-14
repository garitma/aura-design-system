"use client";
import { DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import { BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ChartBar,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  chartAxisTick,
  chartPlotMargin,
  chartTickMargin,
  type ChartConfig,
} from "@/components/ui/Chart";
import { cn } from "@/utils/class-names";

export const chartTooltipsVariants = [
  "default",
  "line",
  "dashed",
  "none",
  "label",
  "icons",
  "formatter",
  "multiple",
] as const;

export type ChartTooltipsVariant = (typeof chartTooltipsVariants)[number];

const monthVisitors = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const titles: Record<ChartTooltipsVariant, string> = {
  default: "Tooltip",
  line: "Tooltip — line",
  dashed: "Tooltip — dashed",
  none: "Tooltip — no indicator",
  label: "Tooltip — label",
  icons: "Tooltip — icons",
  formatter: "Tooltip — formatter",
  multiple: "Tooltip — multiple",
};

const descriptions: Record<ChartTooltipsVariant, string> = {
  default: "Default dot indicator on a single series.",
  line: "Line indicator beside the series label.",
  dashed: "Dashed indicator beside the series label.",
  none: "Value and label with the indicator hidden.",
  label: "Custom label above the series row.",
  icons: "Series icons from the chart config replace the swatch.",
  formatter: "Custom value formatting replaces the default row.",
  multiple: "Dot indicator for two series in one tooltip.",
};

function buildConfig(variant: ChartTooltipsVariant): ChartConfig {
  return {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
      icon: variant === "icons" ? DesktopIcon : undefined,
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
      icon: variant === "icons" ? MobileIcon : undefined,
    },
  };
}

function indicatorFor(variant: ChartTooltipsVariant) {
  if (variant === "line" || variant === "label") return "line" as const;
  if (variant === "dashed") return "dashed" as const;
  return "dot" as const;
}

function ChartTooltips({
  variant = "default",
  className,
}: {
  variant?: ChartTooltipsVariant;
  className?: string;
}) {
  const title = titles[variant];
  const multi = variant === "icons" || variant === "multiple";
  const indicator = indicatorFor(variant);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descriptions[variant]}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={buildConfig(variant)} label={title}>
          <RechartsBarChart
            accessibilityLayer
            data={monthVisitors}
            margin={chartPlotMargin()}
          >
            <CartesianGrid vertical={false} stroke="var(--chart-grid, var(--gray-6))" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={chartTickMargin()}
              interval="preserveStartEnd"
              tick={chartAxisTick}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator={indicator}
                  hideIndicator={variant === "none"}
                  labelFormatter={
                    variant === "label"
                      ? (value) => `Traffic · ${String(value ?? "")}`
                      : undefined
                  }
                  formatter={
                    variant === "formatter"
                      ? (value) => (
                          <span className="font-mono font-medium tabular-nums text-gray-12">
                            {Number(value).toLocaleString()} visitors
                          </span>
                        )
                      : undefined
                  }
                />
              }
            />
            <ChartBar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            {multi ? (
              <ChartBar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            ) : null}
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export { ChartTooltips };
