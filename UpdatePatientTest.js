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
    const [heart_rate, setHeart] = React.useState('');
    const [diabetespedigreefunction, setDPF] = React.useState('');
    const [glucose, setGlucose] = React.useState('');
    const [blood_pressure, setBP] = React.useState('');
    const [skin_thickness, setST] = React.useState('');
    const [insulin, setInsulin] = React.useState('');
    const [outcome, setOutcome] = React.useState('');
    const [bmi, setBMI] = React.useState('');
    const [date_of_appointment, setDate] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

    axios.defaults.baseURL = "http://localhost:8080";

  
      const handleClick = () => {
        setIsClicked(true);
    };

  

    useEffect(() => {
        if (isClicked && patient_ID && heart_rate && diabetespedigreefunction && glucose && blood_pressure && skin_thickness && insulin && bmi && date_of_appointment &&outcome) {
            setIsLoading(true);

            const medData = {
                patient_ID,
                heart_rate,
                diabetespedigreefunction,
                glucose,
                blood_pressure,
                skin_thickness,
                insulin,
                bmi,
                date_of_appointment,
                outcome

            };

            console.log(medData);

            axios.post('/patient_tests/addNewTest', medData, {
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
    }, [isClicked, patient_ID, heart_rate, diabetespedigreefunction, glucose, blood_pressure, skin_thickness, insulin, bmi, date_of_appointment, outcome]);

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
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter Patient ID"
                        value={patient_ID}
                        onChange={(e) => setPatientID(e.target.value)}
                        helperText={isError && !patient_ID ? "Please enter patient ID" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        //error={isError && !medicine_id}
                        id="outlined-error"
                        label="Enter heart rate of patient"
                        value={heart_rate}
                        onChange={(e) => setHeart(e.target.value)}
                        helperText={isError && !heart_rate? "Please enter heart rate of patient" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter value of Diabetes Pedigree Function"
                        value={diabetespedigreefunction}
                        onChange={(e) => setDPF(e.target.value)}
                        helperText={isError && !diabetespedigreefunction ? "Please enter value for Diabetes Pedigree Function" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter glucose"
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                        helperText={isError && !glucose ? "Please enter glucose" : ""}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter blood pressure"
                        value={blood_pressure}
                        onChange={(e) => setBP(e.target.value)}
                        helperText={isError && !blood_pressure ? "Please enter blood pressure" : ""}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter skin thickness"
                        value={skin_thickness}
                        onChange={(e) => setST(e.target.value)}
                        helperText={isError && !skin_thickness ? "Please enter skin thickness" : ""}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter insulin"
                        value={insulin}
                        onChange={(e) => setInsulin(e.target.value)}
                        helperText={isError && !insulin ? "Please enter insulin" : ""}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter bmi"
                        value={bmi}
                        onChange={(e) => setBMI(e.target.value)}
                        helperText={isError && !bmi ? "Please enter bmi" : ""}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        //error={isError && !patient_ID}
                        id="outlined-error"
                        label="Enter outcome"
                        value={outcome}
                        onChange={(e) => setOutcome(e.target.value)}
                        helperText={isError && !outcome ? "Please enter outcome" : ""}
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
