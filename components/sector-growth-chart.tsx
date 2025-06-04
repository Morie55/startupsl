"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SectorGrowthData {
  year: string;
  [key: string]: string | number;
}

interface SectorGrowthChartProps {
  data: SectorGrowthData[];
}

export default function SectorGrowthChart({ data }: SectorGrowthChartProps) {
  // Extract all sector names from the data
  const sectors = Object.keys(data[0]).filter((key) => key !== "year");

  // Create config object for ChartContainer
  const config: Record<string, { label: string; color: string }> = {};
  sectors.forEach((sector, index) => {
    config[sector] = {
      label: sector,
      color: `hsl(var(--chart-${(index % 12) + 1}))`,
    };
  });

  return (
    <ChartContainer config={config} className="w-full h-full">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        accessibilityLayer
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ paddingTop: "20px" }}
        />
        {sectors.map((sector) => (
          <Bar
            key={sector}
            dataKey={sector}
            fill={`var(--color-${sector.toLowerCase().replace(/\s+/g, "-")})`}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
