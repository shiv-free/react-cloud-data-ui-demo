import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { DataItem } from "../interfaces/dataitem";

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#00A2AE",
  "#FFC0CB",
  "#7B68EE",
];

interface LineChartComponentProps {
  rawData: DataItem[];
  resourcesList: string[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  rawData,
  resourcesList,
}) => {
  const [chartData, setChartData] = useState<any[] | null>(null);

  useEffect(() => {
    // Aggregate data by resource category
    const aggregatedData = aggregateDataByCategory(rawData);

    // Aggregate data by date
    const dateWiseAggregation = aggregateDataByDate(aggregatedData);

    const chartData = Object.values(dateWiseAggregation);
    setChartData(chartData);
  }, [rawData]);

  const renderLines = () => {
    // Render Line components for each resource
    return resourcesList.map((resource, index) => (
      <Line
        key={resource}
        type="monotone"
        dataKey={resource}
        stroke={colors[index % colors.length]}
      />
    ));
  };

  return (
    <div className="w100 mt-5 d-flex flex-column align-items-center">
      {chartData && (
        <LineChart
          width={window.innerWidth - 100}
          height={300}
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {renderLines()}
        </LineChart>
      )}
      <h4> Daily Resource Cost</h4>
    </div>
  );
};

export default LineChartComponent;

/**
 * Aggregate data items by resource category
 * @param data - Array of data items
 * @returns Object with aggregated data by category
 */
const aggregateDataByCategory = (data: DataItem[]) => {
  return data.reduce((aggregated: any, item) => {
    const category = item.MeterCategory;
    if (aggregated[category] === undefined) {
      aggregated[category] = [];
    }
    aggregated[category].push(item);
    return aggregated;
  }, {});
};

/**
 * Aggregate data items by date
 * @param data - Object with data aggregated by category
 * @returns Object with aggregated data by date
 */
const aggregateDataByDate = (data: any) => {
  const dateWiseAggregation: any = {};
  for (const key in data) {
    for (const item of data[key]) {
      const { Date, Cost } = item;
      if (dateWiseAggregation[Date] === undefined) {
        dateWiseAggregation[Date] = { name: Date };
      }
      dateWiseAggregation[Date][key] = parseFloat(Cost).toFixed(2);
    }
  }
  return dateWiseAggregation;
};
