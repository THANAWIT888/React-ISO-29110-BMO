

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRef ,useState ,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Stack , Box ,Button ,Popper ,Typography  ,RadioGroup ,FormControlLabel  ,Radio,Select ,MenuItem   } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GetAppIcon from '@mui/icons-material/GetApp';




const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ headerFilter }) {
  const [rowss, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('last');
  const [lastDuration, setLastDuration] = useState('30min');
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [interval, setInterval] = useState("today");
  const [samplingInterval, setSamplingInterval] = useState('30min');
  const [ApiData , setApiData] = useState();
  const [queryData ,setQueryData] = useState({
    filterType: "period",
    data: "today",
    samplingInterval: "30min",
    StartDate : startTime ,
    StopDate : stopTime
  })
  const anchorRef = useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value)
  };

  const filteredRows = rowss.filter((row) => {
    // console.log(row);
    return (
      (row.device_batch_end_volume ? row.device_batch_end_volume.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยชื่ออุปกรณ์
      (row.device_batch_history_volume ? row.device_batch_history_volume.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยระยะทางอุปกรณ์
      (row.device_batch_start_time ? row.device_batch_start_time.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) || // ค้นหาด้วยเวลา
      (row.device_batch_start_volume ? row.device_batch_start_volume.toString().toLowerCase() : '').includes(searchQuery.toLowerCase()) // ค้นหาด้วยสถานะ
    );
  });

  const handleFilterClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };


    const fetchData = async (startTime , stopTime) => {
      
      try {
        console.log('จาก api' , startTime , ' --- ' ,stopTime)
        const response = await fetch('http://100.82.151.125:8000/GetBatchHistoryData/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            StartDate: startTime,
            StopDate: stopTime
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        setRows(  data.GetBatchHistoryData ?
          
          data.GetBatchHistoryData.map((item) => ({

          device_batch_id: item.device_batch_id, 
          device_batch_history_volume: item.device_batch_history_volume + ' L', 
          device_batch_start_volume: item.device_batch_start_volume + ' L',
          device_batch_end_volume: item.device_batch_end_volume + ' L' , 
          device_batch_start_time : item.device_batch_start_time, 
          device_batch_value_status: item.device_batch_value_status, 

        }))
      : []
      );
        // console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
 

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
    padding: 1,
  }}
>
<DataGrid
  rows={filteredRows}
  columns={[
    { field: "device_batch_id", headerName: "ID", width: 200 },
    { field: "device_batch_history_volume", headerName: "Device Name", width: 300 },
    { field: "device_batch_start_volume", headerName: "Device Distance", width: 300 },
    { field: "device_batch_end_volume", headerName: "Tank Volume", width: 300 },
    { field: "device_batch_start_time", headerName: "Timestamp", width: 300 },
    { field: "device_batch_value_status", headerName: "Status", width: 300 },
  ]}
  pageSize={10}
  checkboxSelection
  sx={{ height: 540 }}
  getRowId={(row) => row.device_batch_id}  // Use device_batch_id as the row id
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
    setQueryData({
      ...queryData,
      StartDate: startTime,
      StopDate: stopTime,
    }); // อัปเดต queryData ด้วยค่า StartDate และ StopDate
    setOpen(false); // ปิด Popper
    fetchData(startTime , stopTime)
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

