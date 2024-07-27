import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SinglePatientMedicine = () => {
    const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [patient_ID, setPatientID] = useState('');
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [error, setError] = useState('');
  const [medicine_ID, setMedicineID] = useState('');
  const [start_date, setStartDate] = useState('');
  const [timing, setTiming] = useState('');
  //const [end_date, setEndDate] = useState('');
  axios.defaults.baseURL = "http://localhost:8080";
  //

  const fetchTests = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/medicine_per_patient/findParticularMedicine/${patient_ID}/${start_date}/${medicine_ID}/${timing}`);
      setTests(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching medical tests:', error.response || error);
      setError('Error fetching medical tests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fetchTests();
  };
  

  return (
    <div>
              <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1>Patient</h1>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-error"
              label="Enter ID"
              value={patient_ID}
              onChange={(e) => setPatientID(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-error"
              label="Enter Medicine ID"
              value={medicine_ID}
              onChange={(e) => setMedicineID(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-error"
              label="Enter Start Date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-error"
              label="Enter timing"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              variant="outlined"
              fullWidth
            />
            
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onClick={handleClick}
              color='secondary'
            >
              Submit
            </LoadingButton>
            {error && <p>{error}</p>}
          </Box>
        </Paper>
      </Container>
      <h2>Medical Tests</h2>
      {tests && tests.length > 0 ? (
        <ul>
            
          {tests.map((test) => (
            <li key={test.serial_number}>
            <p>Patient ID: {test.patient_ID || 'Not available'}</p>
            <p>Medicine ID: {test.medicine_ID || 'Not available'}</p>
            <p>Purpse: {test.purpose || 'Not available'}</p>
            <p>Timing: {test.timing || 'Not available'}</p>
            <p>Start Date: {test.start_date || 'Not available'}</p>
            <p>End Date: {test.end_date || 'Not available'}</p>
          </li>
          
          ))}
        </ul>
      ) : (
        <p>Medical Records loading...</p>
      )}
    </div>
  );
};




export default SinglePatientMedicine;
