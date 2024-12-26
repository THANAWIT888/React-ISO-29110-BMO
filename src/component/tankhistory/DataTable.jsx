// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useRef ,useState , useEffect  } from 'react';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import { Stack , Box ,Button ,Popper ,Typography  ,RadioGroup ,FormControlLabel  ,Radio,Select ,MenuItem   } from '@mui/material';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import GetAppIcon from '@mui/icons-material/GetApp';


// export default function DataTable({ headerFilter }) {
//     const [rows, setRows] = useState([]);
//     const [rowCount, setRowCount] = useState(0);
//     const [paginationModel, setPaginationModel] = useState({
//       page: 0,
//       pageSize: 10,
//     });
//     const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [filterType, setFilterType] = useState('last');
//   const [lastDuration, setLastDuration] = useState('30min');
//   const [startTime, setStartTime] = useState(null);
//   const [stopTime, setStopTime] = useState(null);
//   const [interval, setInterval] = useState("today");
//   const [samplingInterval, setSamplingInterval] = useState('30min');
//   const [queryData ,setQueryData] = useState({
//     filterType: "interval",
//     data: "today",
//     samplingInterval: "30min"
//   })
//   const anchorRef = useRef(null);


//   const handleFilterClick = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   useEffect(() => {
//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const { page, pageSize } = paginationModel;
  
//           // เรียก API ของคุณ
//           const response = await fetch("http://100.82.151.125:8000/GetTankData_Pagination/", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//             body: JSON.stringify({
//               page: page + 1, // API เริ่มนับหน้าเป็น 1
//               limit: pageSize,
//             }),
//           });

//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
  
//           const data = await response.json();
  
//           // แปลงข้อมูลให้เหมาะสมกับ DataGrid
//           setRows(
//             data.GetTankHistoryData_DAY.map((item) => ({
//               id: item.raw_id, // ใช้ `raw_id` เป็น `id`
//               name: item.device_name, // แสดงชื่อของอุปกรณ์
//               device_distance: item.device_distance + ' mm',
//               volume: item.device_tank_volume + ' L', // ตัวอย่างข้อมูล
//               timestamp : item.device_timestamp,
//               status: item.status, // สถานะ
  
//             }))
//           );
  
//           // ตั้งค่าจำนวนข้อมูลทั้งหมด
//           setRowCount(data.total_count); // `total_count` คือจำนวนข้อมูลทั้งหมดจาก API
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, [paginationModel]);



//     const [searchQuery, setSearchQuery] = React.useState('');
//     // console.log(queryData)
    
    
//     const handleSearchChange = (event) => {
//       setSearchQuery(event.target.value);
//     };
    
//     const filteredRows = rows.filter((row) => {
//      console.log(row)
//       return (
//         row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         row.device_distance.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         row.volume.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         row.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         row.status.toLowerCase().includes(searchQuery.toLowerCase()) 
//       );
//     });
    

//   return (
//     <>
//       <Box sx={(theme) => ({ width: '100%', display: 'felx' , justifyContent : 'center' ,
      
//       }
      
//       )}>
//         <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between',width: '99%', marginLeft : 1}}>
//           <TextField 
//             label="Search"
//             variant="outlined"
//             fullWidth
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{
//               width: { xs: '80px', md: '200px', lg: '200px' },
//               height: 10,
//               borderRadius: 3,
//               margin: 1,
//             }} 
//           />
//           <Box sx={{ display: 'flex' }}>
//             <Button 
//               variant="contained" 
//               startIcon={<GetAppIcon />}
//               sx={{
//                 width: { xs: '80px', md: '200px', lg: '200px' },
//                 height: 50,
//                 borderRadius: 3,
//                 margin: 1,
//               }} 
//             >
//               Export Data
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<FilterAltIcon />}
//               ref={anchorRef}
//               onClick={handleFilterClick}
//               sx={{
//                 width: { xs: '80px', md: '150px', lg: '150px' },
//                 height: 50,
//                 borderRadius: 3,
//                 margin: 1,
//               }} 
//             >
//               Filter
//             </Button>
//           </Box>
//         </Stack>

//         {/* Data Grid */}
//         <Box
//   sx={{
//     margin: 1,
//     paddingLeft: 1,
//     width : '98.5%',
//     height : 640
//   }}
// >

// <DataGrid
//   rows={filteredRows} // ใช้ filteredRows แทน rows
  
//   columns={[
//     { field: "id", headerName: "ID", width: 200 },
//     { field: "name", headerName: "Device Name", width: 300 },
//     { field: "device_distance", headerName: "Device Distance", width: 300 },
//     { field: "volume", headerName: "Tank Volume", width: 300 },
//     { field: "timestamp", headerName: "Timestamp", width: 300 },
//     { field: "status", headerName: "Status", width: 300 },
//   ]}
//   pagination
//   paginationMode="server"
//   rowCount={rowCount}
//   paginationModel={paginationModel}
//   onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
//   loading={loading}
//   pageSizeOptions={[10, 25, 50, 100]} // ตัวเลือกจำนวนแถวต่อหน้า
// />

// </Box>


//         <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1 }}>
//           <Paper sx={{ padding: 2, width: '350px', marginLeft: { xs: '0px', md: '80px' }, marginTop: '30px' }}>
//             <Typography variant="h6">{headerFilter}</Typography>
            
//             {/* RadioGroup for Filter Type */}
//             <RadioGroup 
//               value={queryData.filterType} 
//               onChange={(e) => setQueryData({ ...queryData, filterType: e.target.value })}
//             >
//               <FormControlLabel value="period" control={<Radio />} label="Time Period" />
//               {queryData.filterType === 'period' && (
//                 <>
//                   <Box sx={{ display: 'block', padding: 1 }}>
//                     <TextField
//                       sx={{ width: '100%' }}
//                       id="outlined-start-time"
//                       label="Start Date"
//                       type="datetime-local"
//                       value={startTime}
//                       onChange={(e) => setStartTime(e.target.value)}
//                       inputLabel={{ shrink: true }}
//                     />
//                     <TextField
//                       sx={{ marginTop: 2, width: '100%' }}
//                       id="outlined-stop-time"
//                       label="Stop Date"
//                       type="datetime-local"
//                       value={stopTime}
//                       onChange={(e) => setStopTime(e.target.value)}
//                       inputLabel={{ shrink: true }}
//                     />
//                   </Box>
//                 </>
//               )}

//               <FormControlLabel value="interval" control={<Radio />} label="Interval" />
//               {queryData.filterType === 'interval' && (
//                 <Select
//                   value={queryData.data}
//                   onChange={(e) => setQueryData({ ...queryData, data: e.target.value })}
//                   fullWidth 
//                   sx={{ mt: 1 }}
//                 >
//                   <MenuItem value="today">Today</MenuItem>
//                   <MenuItem value="dayAgo">Day Ago</MenuItem>
//                   <MenuItem value="weekAgo">Week Ago</MenuItem>
//                   <MenuItem value="monthAgo">Month Ago</MenuItem>
//                 </Select>
//               )}
//             </RadioGroup>

    
//             <Button 
//               variant="contained" 
//               sx={{ marginTop: 2, width: '100%' }} 
//               onClick={() => {
//                 setOpen(false); // Close the Popper when submit is clicked
//               }}
//             >
//               Submit
//             </Button>
//           </Paper>
//         </Popper>
//       </Box>
//     </>
//   );
// }




import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRef ,useState , useEffect  } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Stack , Box ,Button ,Popper ,Typography  ,RadioGroup ,FormControlLabel  ,Radio,Select ,MenuItem   } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GetAppIcon from '@mui/icons-material/GetApp';


export default function DataTable({ headerFilter }) {
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('last');
  const [lastDuration, setLastDuration] = useState('30min');
  const [startTime, setStartTime] = useState('');
  const [stopTime, setStopTime] = useState('');
  const [interval, setInterval] = useState("today");
  const [samplingInterval, setSamplingInterval] = useState('30min');
  const [queryData ,setQueryData] = useState({
    filterType: "period",
    data: "today",
    samplingInterval: "30min",
    StartDate : startTime ,
    StopDate : stopTime
  })
  const anchorRef = useRef(null);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    StartDate : startTime ,
    StopDate : stopTime
  });
  const handleFilterClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

// console.log(paginationModel)


      const fetchData = async (startTime , stopTime) => {
        // console.log(startTime , '---' , stopTime)
        setLoading(true);
        try {
          const { page, pageSize ,StartDate ,StopDate} = paginationModel;
  
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
              start_date : startTime,
              stop_date: stopTime
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          // console.log(data)
  
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
  
        useEffect(() => {
  fetchData();
}, [paginationModel]);
      // fetchData();



    const [searchQuery, setSearchQuery] = React.useState('');
    // console.log(queryData)
    
    
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
    
    const filteredRows = rows.filter((row) => {
    //  console.log(row)
      return (
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.device_distance.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.volume.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.status.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    });
    

  return (
    <>
      <Box sx={(theme) => ({ width: '100%', display: 'felx' , justifyContent : 'center' ,
      
      }
      
      )}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between',width: '99%', marginLeft : 1}}>
          <TextField 
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: '80px', md: '200px', lg: '200px' },
              height: 10,
              borderRadius: 3,
              margin: 1,
            }} 
          />
          <Box sx={{ display: 'flex' }}>
            <Button 
              variant="contained" 
              startIcon={<GetAppIcon />}
              sx={{
                width: { xs: '80px', md: '200px', lg: '200px' },
                height: 50,
                borderRadius: 3,
                margin: 1,
              }} 
            >
              Export Data
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FilterAltIcon />}
              ref={anchorRef}
              onClick={handleFilterClick}
              sx={{
                width: { xs: '80px', md: '150px', lg: '150px' },
                height: 50,
                borderRadius: 3,
                margin: 1,
              }} 
            >
              Filter
            </Button>
          </Box>
        </Stack>

        {/* Data Grid */}
        <Box
  sx={{
    margin: 1,
    paddingLeft: 1,
    width : '98.5%',
    height : 640
  }}
>

<DataGrid
  rows={filteredRows} // ใช้ filteredRows แทน rows
  
  columns={[
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Device Name", width: 300 },
    { field: "device_distance", headerName: "Device Distance", width: 300 },
    { field: "volume", headerName: "Tank Volume", width: 300 },
    { field: "timestamp", headerName: "Timestamp", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
  ]}
  pagination
  paginationMode="server"
  rowCount={rowCount}
  paginationModel={paginationModel}
  onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
  loading={loading}
  pageSizeOptions={[10, 25, 50, 100]} // ตัวเลือกจำนวนแถวต่อหน้า
/>

</Box>


        <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" sx={{ zIndex: 1 }}>
          <Paper sx={{ padding: 2, width: '350px', marginLeft: { xs: '0px', md: '80px' }, marginTop: '30px' }}>
            <Typography variant="h6">{headerFilter}</Typography>
            
            {/* RadioGroup for Filter Type */}
            <RadioGroup 
              value={queryData.filterType} 
              onChange={(e) => setQueryData({ ...queryData, filterType: e.target.value })}
            >
              <FormControlLabel value="period" control={<Radio />} label="Time Period" />
              {queryData.filterType === 'period' && (
                <>
                  <Box sx={{ display: 'block', padding: 1 }}>
                    <TextField
                      sx={{ width: '100%' }}
                      id="outlined-start-time"
                      label="Start Date"
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    />
                    <TextField
                      sx={{ marginTop: 2, width: '100%' }}
                      id="outlined-stop-time"
                      label="Stop Date"
                      type="datetime-local"
                      value={stopTime}
                      onChange={(e) => setStopTime(e.target.value)}
                      slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    />
                  </Box>
                </>
              )}

              <FormControlLabel value="interval" control={<Radio />} label="Interval" />
              {queryData.filterType === 'interval' && (
                <Select
                  value={queryData.data}
                  onChange={(e) => setQueryData({ ...queryData, data: e.target.value })}
                  fullWidth 
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="dayAgo">Day Ago</MenuItem>
                  <MenuItem value="weekAgo">Week Ago</MenuItem>
                  <MenuItem value="monthAgo">Month Ago</MenuItem>
                </Select>
              )}
            </RadioGroup>

    
            <Button 
              variant="contained" 
              sx={{ marginTop: 2, width: '100%' }} 
              onClick={() => {
                setOpen(false); // Close the Popper when submit is clicked
                fetchData(startTime , stopTime);
                setStartTime(startTime);
                setStopTime(stopTime);
              }}
            >
              Submit
            </Button>
          </Paper>
        </Popper>
      </Box>
    </>
  );
}