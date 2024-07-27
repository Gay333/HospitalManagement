import React, { useState } from 'react'
import axios from 'axios'
import { Container, Paper, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const DeletePatientMedicine = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null)
  axios.defaults.baseURL = "http://localhost:8080";
  const [patient_ID, setPatientID] = useState('');
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [medicine_ID, setMedicineID] = useState('');
  const [start_date, setStartDate] = useState('');
  const [timing, setTiming] = useState('');

  const onDelete = (medicineId) => {
    // Implement the logic to handle the deletion
    // For example, you might want to filter out the deleted medicine from the tests array
    setTests((prevTests) => prevTests.filter((test) => test.medicine_ID !== medicineId));
  };
  
  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await axios.delete(`/medicine_per_patient/deleteMedicineRecordPerPatient/${patient_ID}/${start_date}/${medicine_ID}/${timing}`)
      onDelete(medicine_ID)
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
          <h1>Delete Patient's Medicine Record</h1>
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



export default DeletePatientMedicine
