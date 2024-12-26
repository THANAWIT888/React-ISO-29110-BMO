import React, { useState, useRef ,useContext} from 'react';
import { Box, Typography, Divider, Button, Popper, Paper, Select, MenuItem, TextField, Stack, RadioGroup, FormControlLabel, Radio ,CircularProgress } from '@mui/material';
import BroadcastOnPersonalOutlinedIcon from '@mui/icons-material/BroadcastOnPersonalOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useTheme } from '@mui/material/styles';
import {BatchStatusContext} from '../../api/Batch_Status_MQTT';

const CardStatus = () => {
  const {batch_status} = useContext(BatchStatusContext);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('last');
  const [lastDuration, setLastDuration] = useState('30min');
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [interval, setInterval] = useState("today");
  const [samplingInterval, setSamplingInterval] = useState('30min');
  const [queryData ,setQueryData] = useState({
    filterType: "interval",
    data: "today",
    samplingInterval: "30min"
  });
  const anchorRef = useRef(null);
  // console.log(batch_status)

  const theme = useTheme(); // ใช้ useTheme เพื่อดึงค่า theme ปัจจุบัน

  return (
    <>
      <Box 
        variant="rectangular" 
        sx={{
          width: { xs: '100%', md: '46%', lg: '23.8%' },
          height: 310,
          borderRadius: 3,
          margin: 1,
          backgroundColor: theme.palette.background.paper, // ใช้สีจากธีม
          border: '1px solid',
          borderColor: 'grey.300',
        }} 
      >
        <Box sx={{ display: 'flex', padding: 1 }} ref={anchorRef}>
          <BroadcastOnPersonalOutlinedIcon fontSize="large" />
          <Typography variant="h7" sx={{ fontWeight: '700', padding: 1 }}>
            Batch Status
          </Typography>
        </Box>
        <Divider />
        
        <Box sx={{ display: 'flex', padding: 1, cursor: 'pointer', width: '100%', color: '#e5e5e5', justifyContent: 'end' }} onClick={() => setOpen((prev) => !prev)}>
          <WatchLaterOutlinedIcon fontSize="small" />
          <Typography fontSize="12px" sx={{ marginLeft: 1, fontWeight: 'Bold' }}>
            Batch Number : {batch_status.batchnumber} 
          </Typography>
        </Box>


        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 150 
          }}
        >
          {batch_status.batch_power ? (
        <Typography
          fontSize="60px"
          sx={{ marginLeft: 1, fontWeight: "bold" }}
        >
          {batch_status.batch_power}
        </Typography>
      ) : (
        <CircularProgress sx={{ marginLeft: 1 }} />
      )}
        </Box>

        <Stack direction="row" sx={{ display: 'block', width: '100%', paddingLeft: 3, paddingTop: 3 }}>
          <Typography fontSize="12px" sx={{ fontWeight: 'Bold', marginTop: 1, color: '#e5e5e5' }}>
            Last Update
          </Typography>
        </Stack>   
      </Box>
    </>
  );
};

export default CardStatus;
