"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { PieChart as RechartsPieChart, Sector } from "recharts";

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
  ChartPie,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/Chart";
import { cn } from "@/utils/class-names";

export const pieChartVariants = [
  "default",
  "joined",
  "label",
  "legend",
  "donut",
  "active",
  "text",
  "stacked",
] as const;

export type PieChartVariant = (typeof pieChartVariants)[number];

const browserShare = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const mobileShare = [
  { browser: "chrome", visitors: 180, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 160, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 70, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 40, fill: "var(--color-edge)" },
  { browser: "other", visitors: 30, fill: "var(--color-other)" },
];

const titles: Record<PieChartVariant, string> = {
  default: "Pie chart",
  joined: "Pie chart — joined",
  label: "Pie chart — label",
  legend: "Pie chart — legend",
  donut: "Pie chart — donut",
  active: "Pie chart — active",
  text: "Pie chart — text",
  stacked: "Pie chart — stacked",
};

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

const totalVisitors = browserShare.reduce((sum, item) => sum + item.visitors, 0);

function ActiveSlice(props: { outerRadius?: number }) {
  return <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 8} />;
}

function PieChart({
  variant = "default",
  className,
}: {
  variant?: PieChartVariant;
  className?: string;
}) {
  const title = titles[variant];
  const donut = variant === "donut" || variant === "active" || variant === "text";
  const showCenter = variant === "text";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {variant === "stacked"
            ? "Desktop ring outside, mobile ring inside"
            : variant === "active"
              ? "Chrome is pulled out from the donut"
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
            <RechartsPieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="browser" hideLabel />}
              />
              {variant === "stacked" ? (
                <>
                  <ChartPie
                    data={browserShare}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius="62%"
                    outerRadius="80%"
                    stroke="var(--gray-1)"
                    strokeWidth={2}
                  />
                  <ChartPie
                    data={mobileShare}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius="38%"
                    outerRadius="56%"
                    stroke="var(--gray-1)"
                    strokeWidth={2}
                  />
                </>
              ) : (
                <ChartPie
                  data={browserShare}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={donut ? "55%" : 0}
                  outerRadius="80%"
                  stroke={variant === "joined" ? "transparent" : "var(--gray-1)"}
                  strokeWidth={variant === "joined" ? 0 : 2}
                  label={variant === "label"}
                  labelLine={variant === "label"}
                  activeIndex={variant === "active" ? 0 : undefined}
                  activeShape={variant === "active" ? ActiveSlice : undefined}
                />
              )}
              {variant === "legend" ? (
                <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
              ) : null}
            </RechartsPieChart>
          </ChartContainer>
          {showCenter ? (
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

export { PieChart };
