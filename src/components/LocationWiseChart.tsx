import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { DataItem } from "../interfaces/dataitem";

interface LocationInventoryComponentProps {
  rawData: DataItem[];
}

const LocationInventoryComponent: React.FC<LocationInventoryComponentProps> = ({
  rawData,
}) => {
  const [countData, setCountData] = useState<any>(null);
  const [costData, setCostData] = useState<any>(null);

  useEffect(() => {
    // Aggregate count and cost data by location
    const aggregatedData = rawData.reduce(
      (aggregated: any, item) => {
        const category = item.Location;
        // Update count
        aggregated.count[category] = (aggregated.count[category] || 0) + 1;
        // Update cost
        aggregated.cost[category] =
          (aggregated.cost[category] || 0) + parseFloat(item.Cost);
        return aggregated;
      },
      { count: {}, cost: {} }
    );

    // Convert aggregated count data to array format
    const countArray = Object.keys(aggregatedData.count).map((category) => ({
      category,
      count: aggregatedData.count[category],
    }));

    // Convert aggregated cost data to array format
    const costArray = Object.keys(aggregatedData.cost).map((category) => ({
      category,
      cost: aggregatedData.cost[category],
    }));

    setCountData(countArray);
    setCostData(costArray);
  }, [rawData]);

  return (
    <div className="row w100 mt-5">
      <div className="col-6 d-flex align-items-center flex-column">
        <BarChart width={500} height={300} data={countData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
        <h4>Location Size Count</h4>
      </div>
      <div className="col-6 d-flex align-items-center flex-column">
        <BarChart width={500} height={300} data={costData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cost" fill="#8884d8" />
        </BarChart>
        <h4>Location Wise Cost</h4>
      </div>
    </div>
  );
};

export default LocationInventoryComponent;
