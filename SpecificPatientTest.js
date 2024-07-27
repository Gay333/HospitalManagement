import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MedicalTests = () => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [patient_ID, setPatientID] = useState('');
  const [error, setError] = useState('');
  const [Date_of_appointment, setDate] = useState('');

  axios.defaults.baseURL = "http://localhost:8080";
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

  const fetchTests = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/patient_tests/findParticularTestOfPatient/${patient_ID}/${Date_of_appointment}`);
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
              label="Enter Date of Appointment"
              value={Date_of_appointment}
              onChange={(e) => setDate(e.target.value)}
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
            <li key={test.s_no}>
            <p>Patient ID: {test.patient_ID || 'Not available'}</p>
            <p>Date of Appointment: {test.date_of_appointment || 'Not available'}</p>
            <p>Heart Rate: {test.heart_rate || 'Not available'}</p>
            <p>Diabetes Pedigree Function: {test.diabetespedigreefunction || 'Not available'}</p>
            <p>Glucose: {test.glucose || 'Not available'}</p>
            <p>Skin Thickness: {test.skin_thickness || 'Not available'}</p>
            <p>Insulin: {test.insulin || 'Not available'}</p>
            <p>Body Mass Index: {test.bmi || 'Not available'}</p>
            <p>Outcome: {test.outcome !== undefined ? test.outcome : 'Not available'}</p>          </li>
          
          ))}
        </ul>
      ) : (
        <p>Medical Records loading...</p>
      )}
    </div>
  );
};




export default MedicalTests;
