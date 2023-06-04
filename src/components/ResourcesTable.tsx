import React, { useState } from "react";
import { Table } from "antd";
import { DataItem } from "../interfaces/dataitem";
import moment from "moment";

const ResourcesTable = ({ rawData }: { rawData: DataItem[] }) => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, string[] | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: string | null;
    order: "ascend" | "descend" | null;
  }>({ columnKey: null, order: null });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  // Get available filters for a column
  const getAvailableFilters = (column: string) => {
    const filtersSet = new Set<string>();
    for (let record of rawData) {
      filtersSet.add((record as any)[column]);
    }
    return Array.from(filtersSet);
  };

  // Get filter parameters for a column
  const getFilterParams = (column: string) => {
    return {
      filteredValue: filteredInfo[column] || null,
      onFilter: (value: string, record: any) =>
        record[column].includes(value),
      ellipsis: true,
      filters: getAvailableFilters(column).map((resource) => ({
        text: resource,
        value: resource,
        key: resource,
      })),
    };
  };

  // Define table columns
  const columns: any = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      sorter: (a: DataItem, b: DataItem) =>
        moment(a.Date, "DD-MM-YYYY").unix() -
        moment(b.Date, "DD-MM-YYYY").unix(),
      sortOrder: sortedInfo.columnKey === "Date" && sortedInfo.order,
    },
    {
      title: "Instance ID",
      dataIndex: "InstanceId",
      key: "InstanceId",
    },
    {
      title: "Meter Category",
      dataIndex: "MeterCategory",
      key: "MeterCategory",
      ...getFilterParams("MeterCategory"),
    },
    {
      title: "Consumed Quantity",
      dataIndex: "ConsumedQuantity",
      key: "ConsumedQuantity",
      sorter: (a: DataItem, b: DataItem) =>
        parseFloat(a.ConsumedQuantity) - parseFloat(b.ConsumedQuantity),
      sortOrder:
        sortedInfo.columnKey === "ConsumedQuantity" && sortedInfo.order,
    },
    {
      title: "Cost",
      dataIndex: "Cost",
      key: "Cost",
      sorter: (a: DataItem, b: DataItem) =>
        parseFloat(a.Cost) - parseFloat(b.Cost),
      sortOrder: sortedInfo.columnKey === "Cost" && sortedInfo.order,
    },
    {
      title: "Resource Group",
      dataIndex: "ResourceGroup",
      key: "ResourceGroup",
      ...getFilterParams("ResourceGroup"),
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
      ...getFilterParams("Location"),
    },
  ];

  // Handle table change event
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(pagination);
  };

  return (
    <div className="w100 mt-5">
      <Table
        dataSource={rawData}
        columns={columns}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </div>
  );
};

export default ResourcesTable;
