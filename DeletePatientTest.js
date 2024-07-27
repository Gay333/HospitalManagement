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
  const [isDeleting, setIsDeleting] = useState(false)
  axios.defaults.baseURL = "http://localhost:8080";

  axios.defaults.baseURL = "http://localhost:8080";
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

  const onDelete = (patient_ID, Date_of_appointment) => {
    // Implement the logic to handle the deletion
    // For example, you might want to filter out the deleted medicine from the tests array
    setTests((prevTests) => prevTests.filter((test) => test.patient_ID !== patient_ID && test.Date_of_appointment !== Date_of_appointment));
  };
  
  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await axios.delete(`/patient_tests/deleteParticularTest/${patient_ID}/${Date_of_appointment}`)
      onDelete(patient_ID, Date_of_appointment)
    } catch (err) {
      setError('Failed to delete medicine. Please try again.')
      console.error('Error deleting medicine:', err)
    } finally {
      setIsDeleting(false)
    }
  }

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
              onClick={handleDelete}
              color='secondary'
              
            >
            {isDeleting ? 'Deleting...' : 'Delete Medicine'}
              
            </LoadingButton>
            {error && <p className="error">{error}</p>}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};




export default MedicalTests;
