import React, { useEffect, useState } from "react";
import "./App.css";
import ResourcesTable from "./components/ResourcesTable";
import LocationInventoryComponent from "./components/LocationWiseChart";
import { DataItem } from "./interfaces/dataitem";
import LineChartComponent from "./components/LineChart";
import { Tabs } from "antd";

function App() {
  const [rawData, setRawData] = useState<DataItem[]>([]);
  const [resourcesList, setResourcesData] = useState<string[]>([]);

  // Fetch raw data and resources data on component mount
  useEffect(() => {
    fetchRawData();
    fetchResourcesData();
  }, []);

  // Fetch raw data from API
  const fetchRawData = async () => {
    try {
      const response = await fetch(
        "https://engineering-task.elancoapps.com/api/raw"
      );
      const data = await response.json();
      setRawData(data);
    } catch (error) {
      console.error("Failed to fetch raw data:", error);
    }
  };

  // Fetch resources data from API
  const fetchResourcesData = async () => {
    try {
      const response = await fetch(
        "https://engineering-task.elancoapps.com/api/resources"
      );
      const data = await response.json();
      setResourcesData(data);
    } catch (error) {
      console.error("Failed to fetch resources data:", error);
    }
  };

  return (
    <div className="App">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `Location Wise Statistics`,
            children: <LocationInventoryComponent rawData={rawData} />,
          },
          {
            key: "2",
            label: `Daily Resource Cost`,
            children: (
              <LineChartComponent
                resourcesList={resourcesList}
                rawData={rawData}
              />
            ),
          },
          {
            key: "3",
            label: `Resources Data`,
            children: <ResourcesTable rawData={rawData} />,
          },
        ]}
      />
    </div>
  );
}

export default App;
