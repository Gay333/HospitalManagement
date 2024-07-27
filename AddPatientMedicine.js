import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, TimePicker } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function UserRegistration() {
    const [isError, setIsError] = React.useState(false);
    const [patient_ID, setPatientID] = React.useState('');
    const [medicine_id, setMedicineID] = React.useState('');
    const [purpose, setPurpose] = React.useState('');
    const [timing, setTiming] = React.useState('');
    const [start_date, setStartDate] = React.useState(null);
    const [end_date, setEndDate] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

    axios.defaults.baseURL = "http://localhost:8080";

  
      const handleClick = () => {
        setIsClicked(true);
    };

  

    useEffect(() => {
        if (isClicked && patient_ID && medicine_id && purpose && timing && start_date && end_date) {
            setIsLoading(true);

            const medData = {
                patient_ID,
                medicine_id,
                purpose,
                timing,
                start_date,
                end_date
            };

            console.log(medData);

            axios.post('/medicine_per_patient/addNewMedicine', medData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(response => {
                console.log("Medicine Record Added!", response.data);
                setIsLoading(false);
            })
            .catch(error => {
              console.log(medData, medicine_id);
                console.error("Error details:", error);
                setIsError(true);
                setIsLoading(false);
            });
        }
    }, [isClicked, patient_ID, medicine_id, purpose, timing, start_date, end_date]);

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1>Patient Registration</h1>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter Patient ID"
                        value={patient_ID}
                        onChange={(e) => setPatientID(e.target.value)}
                        helperText={isError && !patient_ID ? "Please enter patient ID" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !medicine_id}
                        id="outlined-error"
                        label="Enter Medicine ID"
                        value={medicine_id}
                        onChange={(e) => setMedicineID(e.target.value)}
                        helperText={isError && !medicine_id ? "Please enter Medicine ID" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Purpose of Visit"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        helperText={isError && !purpose ? "Please enter purpose of Visit" : ""}
                        variant="outlined"
                        fullWidth
                    />

                      <TextField
                        error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Timing of Medicine"
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        helperText={isError && !purpose ? "Please enter purpose of Visit" : ""}
                        variant="outlined"
                        fullWidth
                    />  
                     <TextField
                        //error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Start Date"
                        type='date'
                        value={start_date}
                        onChange={(e) => setStartDate(e.target.value)}
                        helperText={isError && !purpose ? "Please enter start date" : ""}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                     <TextField
                        error={isError && !purpose}
                        id="outlined-error"
                        label="Enter End Date"
                        type='date'
                        value={end_date}
                        onChange={(e) => setEndDate(e.target.value)}
                        helperText={isError && !purpose ? "Please enter end date" : ""}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        
                    />

                    
                    
                    <LoadingButton
                        loading={isLoading}
                        variant="contained"
                        onClick={handleClick}
                        color='secondary'
                       
                    >
                        <span>Submit</span>
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}
