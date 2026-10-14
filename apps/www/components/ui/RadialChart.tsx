"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  LabelList,
  PolarGrid,
  RadialBarChart as RechartsRadialBarChart,
} from "recharts";

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
  ChartRadialBar,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/Chart";
import { cn } from "@/utils/class-names";

export const radialChartVariants = [
  "default",
  "label",
  "grid",
  "text",
  "shape",
  "stacked",
] as const;

export type RadialChartVariant = (typeof radialChartVariants)[number];

const browserShare = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const stackedShare = [{ desktop: 1260, mobile: 570 }];

const titles: Record<RadialChartVariant, string> = {
  default: "Radial chart",
  label: "Radial chart — label",
  grid: "Radial chart — grid",
  text: "Radial chart — text",
  shape: "Radial chart — shape",
  stacked: "Radial chart — stacked",
};

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const totalVisitors = browserShare.reduce((sum, item) => sum + item.visitors, 0);

function RadialChart({
  variant = "default",
  className,
}: {
  variant?: RadialChartVariant;
  className?: string;
}) {
  const title = titles[variant];
  const stacked = variant === "stacked";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {stacked
            ? "Desktop and mobile as stacked arcs"
            : "Browser share for the last 6 months"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ChartContainer
            config={chartConfig}
            label={title}
            className="mx-auto aspect-square h-20 max-w-20"
          >
            <RechartsRadialBarChart
              data={stacked ? stackedShare : browserShare}
              innerRadius={stacked ? "45%" : "30%"}
              outerRadius="90%"
              startAngle={stacked ? 180 : 90}
              endAngle={stacked ? 0 : -270}
              barSize={stacked ? 26 : 13}
            >
              {variant === "grid" ? (
                <PolarGrid gridType="circle" stroke="var(--chart-grid, var(--gray-6))" />
              ) : null}
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey={stacked ? undefined : "browser"}
                    hideLabel
                  />
                }
              />
              {stacked ? (
                <>
                  <ChartRadialBar
                    dataKey="desktop"
                    stackId="a"
                    cornerRadius={13}
                    fill="var(--color-desktop)"
                    background={{ fill: "var(--gray-3)" }}
                  />
                  <ChartRadialBar
                    dataKey="mobile"
                    stackId="a"
                    cornerRadius={13}
                    fill="var(--color-mobile)"
                  />
                </>
              ) : (
                <ChartRadialBar
                  dataKey="visitors"
                  background={{ fill: "var(--gray-3)" }}
                  cornerRadius={variant === "shape" ? 13 : 0}
                >
                  {variant === "label" ? (
                    <LabelList
                      dataKey="browser"
                      position="insideStart"
                      fontSize="var(--chart-tick-size, var(--spacing))"
                      fill="var(--gray-12)"
                      className="capitalize"
                    />
                  ) : null}
                </ChartRadialBar>
              )}
            </RechartsRadialBarChart>
          </ChartContainer>
          {variant === "text" ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="h5 text-gray-12">{totalVisitors.toLocaleString()}</span>
              <span className="text-sm text-gray-11">Visitors</span>
            </div>
          ) : null}
        </div>
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

export { RadialChart };
