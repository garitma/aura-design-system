"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  XAxis,
  YAxis,
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
  ChartBar,
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
import { cn } from "@/utils/class-names";

export const barChartVariants = [
  "default",
  "horizontal",
  "multiple",
  "stacked",
  "label",
  "custom",
  "mixed",
  "active",
  "negative",
] as const;

export type BarChartVariant = (typeof barChartVariants)[number];

const monthVisitors = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const negativeVisitors = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 305 },
  { month: "March", visitors: -237 },
  { month: "April", visitors: 73 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
];

const titles: Record<BarChartVariant, string> = {
  default: "Bar chart",
  horizontal: "Bar chart — horizontal",
  multiple: "Bar chart — multiple",
  stacked: "Bar chart — stacked",
  label: "Bar chart — label",
  custom: "Bar chart — custom label",
  mixed: "Bar chart — mixed",
  active: "Bar chart — active",
  negative: "Bar chart — negative",
};

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  visitors: { label: "Visitors", color: "var(--chart-1)" },
} satisfies ChartConfig;

function MonthLabel({
  x = 0,
  y = 0,
  width = 0,
  value,
}: {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  value?: string | number;
}) {
  const label = String(value ?? "").slice(0, 3);
  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) - chartTickMargin() / 2}
      fill="var(--chart-tick, var(--gray-11))"
      fontSize="var(--chart-tick-size, var(--spacing))"
      textAnchor="middle"
    >
      {label}
    </text>
  );
}

function BarChart({
  variant = "default",
  className,
}: {
  variant?: BarChartVariant;
  className?: string;
}) {
  const title = titles[variant];
  const horizontal = variant === "horizontal";
  const negative = variant === "negative";
  const multi = variant === "multiple" || variant === "stacked" || variant === "mixed";
  const stacked = variant === "stacked";
  const data = negative ? negativeVisitors : monthVisitors;
  const highlight = monthVisitors.length - 1;
  const showLegend = variant === "multiple" || variant === "stacked" || variant === "mixed";

  const bars = negative ? (
    <ChartBar dataKey="visitors" radius={4}>
      {negativeVisitors.map((item) => (
        <Cell
          key={item.month}
          fill={item.visitors < 0 ? "var(--chart-5)" : "var(--color-visitors)"}
        />
      ))}
    </ChartBar>
  ) : variant === "active" ? (
    <ChartBar dataKey="desktop" radius={4}>
      {monthVisitors.map((item, index) => (
        <Cell
          key={item.month}
          fill="var(--color-desktop)"
          fillOpacity={index === highlight ? 1 : 0.35}
        />
      ))}
    </ChartBar>
  ) : (
    <ChartBar
      dataKey="desktop"
      fill="var(--color-desktop)"
      radius={stacked ? [0, 0, 0, 0] : 4}
      layout={horizontal ? "vertical" : "horizontal"}
      stackId={stacked ? "a" : undefined}
    >
      {variant === "label" ? (
        <LabelList
          dataKey="desktop"
          position="top"
          offset={chartTickMargin() / 2}
          fontSize="var(--chart-tick-size, var(--spacing))"
          fill="var(--chart-tick, var(--gray-11))"
        />
      ) : null}
      {variant === "custom" ? (
        <LabelList dataKey="month" content={MonthLabel} />
      ) : null}
    </ChartBar>
  );

  const plot = variant === "mixed" ? (
    <ComposedChart
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
      <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
      <ChartBar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      <ChartLine
        dataKey="mobile"
        type="natural"
        stroke="var(--color-mobile)"
        strokeWidth={2}
        dot={false}
      />
      <ChartLegend content={<ChartLegendContent />} />
    </ComposedChart>
  ) : (
    <RechartsBarChart
      accessibilityLayer
      data={data}
      layout={horizontal ? "vertical" : "horizontal"}
      margin={chartPlotMargin(
        variant === "label" || variant === "custom"
          ? { top: chartTickMargin() * 2 }
          : undefined
      )}
    >
      <CartesianGrid vertical={horizontal} stroke="var(--chart-grid, var(--gray-6))" />
      {horizontal ? (
        <XAxis
          type="number"
          dataKey="desktop"
          tickLine={false}
          axisLine={false}
          tickMargin={chartTickMargin()}
          interval="preserveStartEnd"
          tick={chartAxisTick}
        />
      ) : (
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={chartTickMargin()}
          interval="preserveStartEnd"
          tick={chartAxisTick}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
      )}
      {horizontal ? (
        <YAxis
          type="category"
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={chartTickMargin()}
          interval="preserveStartEnd"
          width={78}
          tick={chartAxisTick}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
      ) : null}
      <ChartTooltip
        content={
          <ChartTooltipContent
            indicator={horizontal ? "line" : "dot"}
            hideLabel={negative}
          />
        }
      />
      {bars}
      {multi ? (
        <ChartBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          radius={4}
          layout={horizontal ? "vertical" : "horizontal"}
          stackId={stacked ? "a" : undefined}
        />
      ) : null}
      {showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
    </RechartsBarChart>
  );

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {negative
            ? "Showing visitor change for the last 6 months"
            : variant === "active"
              ? "June is highlighted. Earlier months stay quiet."
              : "Showing total visitors for the last 6 months"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          label={title}
          className={horizontal ? "aspect-auto h-20" : undefined}
        >
          {plot}
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

export { BarChart };
