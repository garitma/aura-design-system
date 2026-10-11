import { AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartArea,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  chartAxisTick,
  chartPlotMargin,
  chartTickMargin,
  type ChartConfig,
} from "@/components/ui/Chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;


export const ChartDemo = () => (
  <ChartContainer config={chartConfig} label="Desktop visitors" className="w-full">
    <AreaChart accessibilityLayer data={chartData} margin={chartPlotMargin()}>
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
      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
      <ChartArea
        dataKey="desktop"
        type="natural"
        fill="var(--color-desktop)"
        fillOpacity={0.4}
        stroke="var(--color-desktop)"
        strokeWidth={2}
      />
    </AreaChart>
  </ChartContainer>
)