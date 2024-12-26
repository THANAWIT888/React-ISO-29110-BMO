import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const TestServerSideGrid = () => {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { page, pageSize } = paginationModel;

        // เรียก API ของคุณ
        const response = await fetch("http://100.82.151.125:8000/GetTankData_Pagination/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            page: page + 1, // API เริ่มนับหน้าเป็น 1
            limit: pageSize,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // แปลงข้อมูลให้เหมาะสมกับ DataGrid
        setRows(
          data.GetTankHistoryData_DAY.map((item) => ({
            id: item.raw_id, // ใช้ `raw_id` เป็น `id`
            name: item.device_name, // แสดงชื่อของอุปกรณ์
            device_distance: item.device_distance + ' mm',
            volume: item.device_tank_volume + ' L', // ตัวอย่างข้อมูล
            timestamp : item.device_timestamp,
            status: item.status, // สถานะ

          }))
        );

        // ตั้งค่าจำนวนข้อมูลทั้งหมด
        setRowCount(data.total_count); // `total_count` คือจำนวนข้อมูลทั้งหมดจาก API
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);

  return (
    <DataGrid
      sx={{
        height: 600,
      }}
      rows={rows}
      columns={[
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Device Name", width: 200 },
        { field: "device_distance", headerName: "Device Distance", width: 200 },
        { field: "volume", headerName: "Tank Volume", width: 150 },
        { field: "timestamp", headerName: "Timestamp", width: 250 },
        { field: "status", headerName: "Status", width: 100 },
      ]}
      pagination
      paginationMode="server"
      rowCount={rowCount}
      paginationModel={paginationModel}
      onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
      loading={loading}
      pageSizeOptions={[5, 10, 20 , 100]} // ตัวเลือกจำนวนแถวต่อหน้า
    />
  );
};

export default TestServerSideGrid;
