import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRef ,useState } from 'react';
import Paper from '@mui/material/Paper';

import PropTypes from 'prop-types';
import { styled, css, border, borderRadius, height } from '@mui/system';
import TextField from '@mui/material/TextField';
// import { Modal as BaseModal } from '@mui/base/Modal';
import Divider from '@mui/material/Divider';


import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';


import { Stack , Box ,Button ,Popper ,Typography  ,RadioGroup ,FormControlLabel  ,Radio,Select ,MenuItem  ,Modal ,Grid ,FormControl  ,InputLabel } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GetAppIcon from '@mui/icons-material/GetApp';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 560,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius : 1 ,
  // boxShadow: 24,
  p: 4,
};



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 15, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 19, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 20, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 21, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 22, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 23, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 24, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 25, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 26, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 27, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 28, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 29, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 30, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 31, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 32, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 33, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 34, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 35, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 36, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ChildNotify({ headerFilter }) {

// popup create user
const handlePermissionChange = (event) => {
  setPermission(event.target.value);
};

const handleStatusChange = (event) => {
  setStatus(event.target.value);
};


const [email, setEmail] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [password, setPassword] = useState("");
const [permission, setPermission] = useState("");
const [status, setStatus] = useState("");
const [verifyPassword, setVerifyPassword] = useState("");
const [error, setError] = useState(""); // สำหรับแสดงข้อความผิดพลาด


const handleSubmit = () => {

  if (password !== verifyPassword) {
    setError("Passwords do not match!"); // แสดงข้อความผิดพลาด
    return;
  }

  const formData = {
    email,
    firstName,
    lastName,
    password,
    permission,
    status,
  };
  console.log("Form Data as JSON:", JSON.stringify(formData));
  // ส่งข้อมูลไปยัง backend หรือแสดงผล
};


//  Modual Popup

const [openModual, setOpenModual] = React.useState(false);
const handleOpen = () => setOpenModual(true);
const handleClose = () => setOpenModual(false);



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
  })
  const anchorRef = useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  // console.log(queryData)
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // console.log(event.target.value)
  };

  const filteredRows = rows.filter((row) => {
    const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || String(row.age).includes(searchQuery);
  });

  const handleFilterClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
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
            onClick={handleOpen}
              variant="contained" 
              startIcon={<AddCircleIcon />}
              sx={{
                width: { xs: '80px', md: '200px', lg: '120px' },
                height: 50,
                borderRadius: 3,
                margin: 1,
              }} 
            >
              <Box  sx={{paddingTop :'2px'}}>
              ADD
              </Box>
   </Button>
            
  
          </Box>
        </Stack>

        {/* Data Grid */}
        <Box
  sx={{
    margin: 1,
    
  }}
>
  <DataGrid
    rows={filteredRows} 
    columns={columns}
    pageSize={10}
    checkboxSelection
    sx={{ height: 540,}}
  />
</Box>

        {/* Popper for Filter Options */}
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
                      inputLabel={{ shrink: true }}
                    />
                    <TextField
                      sx={{ marginTop: 2, width: '100%' }}
                      id="outlined-stop-time"
                      label="Stop Date"
                      type="datetime-local"
                      value={stopTime}
                      onChange={(e) => setStopTime(e.target.value)}
                      inputLabel={{ shrink: true }}
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
              }}
            >
              Submit
            </Button>
          </Paper>
        </Popper>
    
        <Modal
        open={openModual}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx = {{textAlign : 'center'}} id="modal-modal-title" variant="h6" component="h2">
            Create User
          </Typography>
        <Divider/>

        <Box sx={{padding : 2, marginTop : 2, textAlign : 'center'}}>

        <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
      </Grid>
    </Grid>
        
        <Grid container spacing={2} sx={{marginBottom : 2}}>
      <Grid item xs={6}>
      <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
      </Grid>
      <Grid item xs={6}>
      <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
      </Grid>
    </Grid>
    <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
      <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                type = "password"
                onChange={(e) => setPassword(e.target.value)}
              />
      </Grid>
    </Grid>
    <Grid container spacing={1} sx={{marginBottom : 2}}>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="Verify Password"
          variant="outlined"
          type = "password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          error={password !== verifyPassword && verifyPassword !== ""} // แสดง error เมื่อไม่ตรง
          helperText={
            password !== verifyPassword && verifyPassword !== ""
              ? "Passwords do not match!"
              : ""
          } 
          fullWidth
          
        />
      </Grid>
    </Grid>

    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Permission Dropdown */}
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="permission-label">Permission</InputLabel>
          <Select
            labelId="permission-label"
            id="permission-select"
           
            label="permission"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Status Dropdown */}
      <Grid item xs={6}>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
   
    label="status"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
      </Grid>
    </Grid>
{/* 
    <Box sx={{display: 'flex' , justifyContent: 'space-between' , background : '#EBEBEB'}}>
    <Button size="large">Cancle</Button>
      <Button size="large" variant="outlined">Submit</Button>

    </Box> */}
        
        </Box>
        <Divider/>
        <Box sx={{display: 'flex' , justifyContent: 'space-between', marginTop : 1}}>
        <Button onClick={handleClose}>Cancel</Button>
      <Button size="large" variant="outlined" onClick={handleSubmit}>Submit</Button>

    </Box>
        
        </Box>
    
      </Modal>

      </Box>
    </>
  );
}
