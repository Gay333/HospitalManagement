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

export default function AddPatientRecord() {
    const [isError, setIsError] = React.useState(false);
    const [patient_ID, setPatientID] = React.useState('');
    const [type_of_patient, setType] = React.useState('');
    const [purpose_of_visit, setPurpose] = React.useState('');
    const [past_history, setPast] = React.useState('');
    const [doctor_id, setDoctor] = React.useState('');
    const [nurse_id, setNurse] = React.useState('');
    const [hospital_id, setHospital] = React.useState('');
    const [time_of_visit, setTiming] = React.useState('');
    const [Date_of_appointment, setDate] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

    axios.defaults.baseURL = "http://localhost:8080";

  
      const handleClick = () => {
        setIsClicked(true);
    };

  

    useEffect(() => {
        if (isClicked && patient_ID && type_of_patient && purpose_of_visit && past_history && doctor_id && nurse_id && time_of_visit && hospital_id && Date_of_appointment) {
            setIsLoading(true);

            const medData = {
                patient_ID,
                type_of_patient,
                purpose_of_visit,
                past_history,
                doctor_id,
                nurse_id,
                time_of_visit,
                hospital_id,
                Date_of_appointment
            };

            console.log(medData);

            axios.post('/patient_medical_record/addNewRecord', medData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(response => {
                console.log("Patient Record Added!", response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error details:", error);
                setIsError(true);
                setIsLoading(false);
            });
        }
    }, [isClicked, patient_ID, type_of_patient, purpose_of_visit, past_history, doctor_id, nurse_id, time_of_visit, hospital_id, Date_of_appointment]);

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
                        label="Enter Type of patient"
                        value={type_of_patient}
                        onChange={(e) => setType(e.target.value)}
                        helperText={isError && !type_of_patient? "Please enter type of patient" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter Doctor ID"
                        value={doctor_id}
                        onChange={(e) => setDoctor(e.target.value)}
                        helperText={isError && !doctor_id ? "Please enter doctor ID" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter Nurse ID"
                        value={nurse_id}
                        onChange={(e) => setNurse(e.target.value)}
                        helperText={isError && !nurse_id ? "Please enter nurse ID" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter Hospital"
                        value={hospital_id}
                        onChange={(e) => setHospital(e.target.value)}
                        helperText={isError && !hospital_id ? "Please enter hospital ID" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Purpose of Visit"
                        value={purpose_of_visit}
                        onChange={(e) => setPurpose(e.target.value)}
                        helperText={isError && !purpose_of_visit ? "Please enter purpose of Visit" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Any past history"
                        value={past_history}
                        onChange={(e) => setPast(e.target.value)}
                        helperText={isError && !past_history ? "Please enter past history" : ""}
                        variant="outlined"
                        fullWidth
                    />

                      <TextField
                        error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Timing"
                        value={time_of_visit}
                        onChange={(e) => setTiming(e.target.value)}
                        helperText={isError && !time_of_visit ? "Please enter timing of Visit" : ""}
                        variant="outlined"
                        fullWidth
                    />  
                     <TextField
                        //error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Date of Appointment"
                        type='date'
                        value={Date_of_appointment}
                        onChange={(e) => setDate(e.target.value)}
                        helperText={isError && !purpose ? "Please enter date of appointment" : ""}
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
