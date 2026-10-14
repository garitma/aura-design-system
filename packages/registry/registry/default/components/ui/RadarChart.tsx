"use client";
import { ArrowUpIcon, DesktopIcon, MobileIcon } from "@radix-ui/react-icons";
import { PolarAngleAxis, PolarGrid, RadarChart as RechartsRadarChart } from "recharts";

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
  ChartRadar,
  ChartTooltip,
  ChartTooltipContent,
  chartAxisTick,
  type ChartConfig,
} from "@/components/ui/Chart";
import { cn } from "@/utils/class-names";

export const radarChartVariants = [
  "default",
  "dots",
  "lines",
  "multiple",
  "legend",
  "circle",
  "filled",
  "icons",
] as const;

export type RadarChartVariant = (typeof radarChartVariants)[number];

const monthVisitors = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const titles: Record<RadarChartVariant, string> = {
  default: "Radar chart",
  dots: "Radar chart — dots",
  lines: "Radar chart — lines",
  multiple: "Radar chart — multiple",
  legend: "Radar chart — legend",
  circle: "Radar chart — circle",
  filled: "Radar chart — filled",
  icons: "Radar chart — icons",
};

function buildConfig(variant: RadarChartVariant): ChartConfig {
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

function seriesKeys(variant: RadarChartVariant) {
  if (variant === "multiple" || variant === "legend" || variant === "icons") {
    return ["desktop", "mobile"] as const;
  }
  return ["desktop"] as const;
}

function RadarChart({
  variant = "default",
  className,
}: {
  variant?: RadarChartVariant;
  className?: string;
}) {
  const title = titles[variant];
  const keys = seriesKeys(variant);
  const linesOnly = variant === "lines";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Showing total visitors for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={buildConfig(variant)}
          label={title}
          className="mx-auto aspect-square h-20 max-w-20"
        >
          <RechartsRadarChart data={monthVisitors}>
            {variant === "filled" ? (
              <PolarGrid stroke="none" fill="var(--gray-3)" fillOpacity={1} />
            ) : (
              <PolarGrid
                gridType={variant === "circle" ? "circle" : "polygon"}
                stroke="var(--chart-grid, var(--gray-6))"
              />
            )}
            <PolarAngleAxis
              dataKey="month"
              interval="preserveStartEnd"
              tick={chartAxisTick}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            {keys.map((key) => (
              <ChartRadar
                key={key}
                dataKey={key}
                fill={linesOnly ? "transparent" : `var(--color-${key})`}
                fillOpacity={linesOnly ? 0 : 0.5}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={
                  variant === "dots"
                    ? { r: 4, fill: `var(--color-${key})`, strokeWidth: 0 }
                    : false
                }
              />
            ))}
            {variant === "legend" || variant === "icons" ? (
              <ChartLegend content={<ChartLegendContent />} />
            ) : null}
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="grid gap-0.5">
          <div className="flex items-center gap-0.5 text-sm font-medium text-gray-12">
            Trending up by 5.2% this month
            <ArrowUpIcon className="icon" />
          </div>
          <p className="text-sm text-gray-11">January – June 2024</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export { RadarChart };

