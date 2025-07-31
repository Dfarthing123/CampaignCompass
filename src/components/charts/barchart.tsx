"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", contacts: 222, voters: 150 },
  { date: "2024-04-02", contacts: 97, voters: 180 },
  { date: "2024-04-03", contacts: 167, voters: 120 },
  { date: "2024-04-04", contacts: 242, voters: 260 },
  { date: "2024-04-05", contacts: 373, voters: 290 },
  { date: "2024-04-06", contacts: 301, voters: 340 },
  { date: "2024-04-07", contacts: 245, voters: 180 },
  { date: "2024-04-08", contacts: 409, voters: 320 },
  { date: "2024-04-09", contacts: 59, voters: 110 },
  { date: "2024-04-10", contacts: 261, voters: 190 },
  { date: "2024-04-11", contacts: 327, voters: 350 },
  { date: "2024-04-12", contacts: 292, voters: 210 },
  { date: "2024-04-13", contacts: 342, voters: 380 },
  { date: "2024-04-14", contacts: 137, voters: 220 },
  { date: "2024-04-15", contacts: 120, voters: 170 },
  { date: "2024-04-16", contacts: 138, voters: 190 },
  { date: "2024-04-17", contacts: 446, voters: 360 },
  { date: "2024-04-18", contacts: 364, voters: 410 },
  { date: "2024-04-19", contacts: 243, voters: 180 },
  { date: "2024-04-20", contacts: 89, voters: 150 },
  { date: "2024-04-21", contacts: 137, voters: 200 },
  { date: "2024-04-22", contacts: 224, voters: 170 },
  { date: "2024-04-23", contacts: 138, voters: 230 },
  { date: "2024-04-24", contacts: 387, voters: 290 },
  { date: "2024-04-25", contacts: 215, voters: 250 },
  { date: "2024-04-26", contacts: 75, voters: 130 },
  { date: "2024-04-27", contacts: 383, voters: 420 },
  { date: "2024-04-28", contacts: 122, voters: 180 },
  { date: "2024-04-29", contacts: 315, voters: 240 },
  { date: "2024-04-30", contacts: 454, voters: 380 },
  { date: "2024-05-01", contacts: 165, voters: 220 },
  { date: "2024-05-02", contacts: 293, voters: 310 },
  { date: "2024-05-03", contacts: 247, voters: 190 },
  { date: "2024-05-04", contacts: 385, voters: 420 },
  { date: "2024-05-05", contacts: 481, voters: 390 },
  { date: "2024-05-06", contacts: 498, voters: 520 },
  { date: "2024-05-07", contacts: 388, voters: 300 },
  { date: "2024-05-08", contacts: 149, voters: 210 },
  { date: "2024-05-09", contacts: 227, voters: 180 },
  { date: "2024-05-10", contacts: 293, voters: 330 },
  { date: "2024-05-11", contacts: 335, voters: 270 },
  { date: "2024-05-12", contacts: 197, voters: 240 },
  { date: "2024-05-13", contacts: 197, voters: 160 },
  { date: "2024-05-14", contacts: 448, voters: 490 },
  { date: "2024-05-15", contacts: 473, voters: 380 },
  { date: "2024-05-16", contacts: 338, voters: 400 },
  { date: "2024-05-17", contacts: 499, voters: 420 },
  { date: "2024-05-18", contacts: 315, voters: 350 },
  { date: "2024-05-19", contacts: 235, voters: 180 },
  { date: "2024-05-20", contacts: 177, voters: 230 },
  { date: "2024-05-21", contacts: 82, voters: 140 },
  { date: "2024-05-22", contacts: 81, voters: 120 },
  { date: "2024-05-23", contacts: 252, voters: 290 },
  { date: "2024-05-24", contacts: 294, voters: 220 },
  { date: "2024-05-25", contacts: 201, voters: 250 },
  { date: "2024-05-26", contacts: 213, voters: 170 },
  { date: "2024-05-27", contacts: 420, voters: 460 },
  { date: "2024-05-28", contacts: 233, voters: 190 },
  { date: "2024-05-29", contacts: 78, voters: 130 },
  { date: "2024-05-30", contacts: 340, voters: 280 },
  { date: "2024-05-31", contacts: 178, voters: 230 },
  { date: "2024-06-01", contacts: 178, voters: 200 },
  { date: "2024-06-02", contacts: 470, voters: 410 },
  { date: "2024-06-03", contacts: 103, voters: 160 },
  { date: "2024-06-04", contacts: 439, voters: 380 },
  { date: "2024-06-05", contacts: 88, voters: 140 },
  { date: "2024-06-06", contacts: 294, voters: 250 },
  { date: "2024-06-07", contacts: 323, voters: 370 },
  { date: "2024-06-08", contacts: 385, voters: 320 },
  { date: "2024-06-09", contacts: 438, voters: 480 },
  { date: "2024-06-10", contacts: 155, voters: 200 },
  { date: "2024-06-11", contacts: 92, voters: 150 },
  { date: "2024-06-12", contacts: 492, voters: 420 },
  { date: "2024-06-13", contacts: 81, voters: 130 },
  { date: "2024-06-14", contacts: 426, voters: 380 },
  { date: "2024-06-15", contacts: 307, voters: 350 },
  { date: "2024-06-16", contacts: 371, voters: 310 },
  { date: "2024-06-17", contacts: 475, voters: 520 },
  { date: "2024-06-18", contacts: 107, voters: 170 },
  { date: "2024-06-19", contacts: 341, voters: 290 },
  { date: "2024-06-20", contacts: 408, voters: 450 },
  { date: "2024-06-21", contacts: 169, voters: 210 },
  { date: "2024-06-22", contacts: 317, voters: 270 },
  { date: "2024-06-23", contacts: 480, voters: 530 },
  { date: "2024-06-24", contacts: 132, voters: 180 },
  { date: "2024-06-25", contacts: 141, voters: 190 },
  { date: "2024-06-26", contacts: 434, voters: 380 },
  { date: "2024-06-27", contacts: 448, voters: 490 },
  { date: "2024-06-28", contacts: 149, voters: 200 },
  { date: "2024-06-29", contacts: 103, voters: 160 },
  { date: "2024-06-30", contacts: 446, voters: 400 },
];

const chartConfig = {
  views: {
    label: "Campaign",
  },
  contacts: {
    label: "contacts",
    color: "var(--chart-2)",
  },
  voters: {
    label: "voters",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AppBarChart = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("contacts");

  const total = React.useMemo(
    () => ({
      contacts: chartData.reduce((acc, curr) => acc + curr.contacts, 0),
      voters: chartData.reduce((acc, curr) => acc + curr.voters, 0),
    }),
    []
  );

  return (
    <Card className="py-0 bg-neutral-50 dark:bg-neutral-900">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-row justify-between">
          {["contacts", "voters"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-evenly  px-6 py-4 text-left border-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs font-mono">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              //  fillOpacity={0.4}
              // barSize={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppBarChart;
