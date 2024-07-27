import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
//import axios from axios;
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import TextField from '@mui/material/TextField';
import { format } from 'date-fns';



export default function UserRegistration() {
    //const [value, setValue] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const [patient_firstname, setFirstName] = React.useState('');
    const [patient_lastname, setLastName] = React.useState('');
    const [patient_phone, setPhone] = React.useState('');
    const [patient_address, setAddress] = React.useState('');
    const [occupation, setOcc] = React.useState('');
    const [patient_DOB, setDOB] = React.useState(null);
    const [patient_age, setAge] = React.useState(0);
    const [patient_gender, setGender] = React.useState('');
    const [patient_bloodtype, setBloodType] = React.useState('');
    const [prior_pregnancies, setPriorPreg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [patient_ID, setPatientID] = React.useState('');
    //const patient_dob = format(patient_dob, 'yyyy-MM-dd');


    //axios.defaults.baseURL = "http://localhost:8080";

    const handleClick = () => {
      const newPatientID = generateId();
      setPatientID(newPatientID); 
    };
    
    /*
    useEffect(() => {

      if (patient_ID) {
        setIsLoading(true);
        const patient = {
          patient_ID,
          patient_firstName,
          patient_lastName,
          patient_phone,
          patient_address,
          occupation,
          patient_dob,
          patient_age,
          patient_gender,
          patient_bloodtype,
          prior_pregnancies
        };
        console.log(patient);
    
        fetch("http://localhost:8080/patient/addPatient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          
          body: JSON.stringify(patient
        )})

        
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(patient => {
          console.log("Patient Added!", patient);
          setIsLoading(false);
          
        })
        .catch(error => {
          console.error("There was a problem with the fetch operation:", error);
          setIsError(true);
          setIsLoading(false);
          
        });
        console.log(patient);
        
      }
      // 
    }, [patient_ID,patient_firstName, patient_lastName, patient_phone, patient_address, occupation, patient_dob, patient_age, patient_gender, patient_bloodtype, prior_pregnancies]); // Only patient_ID is needed as a dependency here
    
    */
    useEffect(() => {
      if (patient_ID) {
        setIsLoading(true);
        const patientData = {
          patient_ID,        patient_firstname,        patient_lastname,        patient_phone,        patient_address,        occupation,        patient_DOB,        patient_age,        patient_gender,        patient_bloodtype,        prior_pregnancies      };
        console.log(patientData);
          axios.post('http://localhost:8080/patient/addPatient', patientData, {
          headers: {
            'Content-Type': 'application/json'        },      
            withCredentials: true
          })      .then(response => {
            if (response.headers['content-type'].includes('text/html')) {
              throw new Error('Received HTML response instead of JSON');
            }
            console.log("Patient Added!", response.data);
            setIsLoading(false);
          })
    .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(error => {
            console.error("Error details:", error);
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received:", error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error message:", error.message);
            }
            setIsError(true);
            setIsLoading(false);
          });
      }
    }, [patient_ID, patient_firstname, patient_lastname, patient_phone, patient_address, occupation, patient_DOB, patient_age, patient_gender, patient_bloodtype, prior_pregnancies]);

    function generateId() {
      return uuidv4(); // Generates a unique ID
    }

    /*const handleChange = (event) => {
        const newValue = event.target.value;
        // Check if the new value is not a number (or any other type check you need)
        if (isNaN(newValue)) {
          setIsError(true);
        } else {
          setIsError(false);
        }
        setValue(newValue);
      };*/

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Patient Registration</h1>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
      
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient First Name"
          
          value = {patient_firstname}
          onChange = {(e)=>setFirstName(e.target.value)}
          helperText = {isError? "Please enter your first name":""}
          variant="outlined"
          //defaultValue="Jane"
          fullWidth
        />
        
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Last Name"
          value = {patient_lastname}
          onChange = {(e)=>setLastName(e.target.value)}
          helperText = {isError? "Please enter your last name":""}
          variant="outlined"
          //defaultValue="Doe"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Phone Number"
          value = {patient_phone}
          onChange = {(e)=>setPhone(e.target.value)}
          helperText = {isError? "Please enter your phone number":""}
          variant="outlined"
          //defaultValue="9001234532"
          fullWidth
        />
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Address"
          value = {patient_address}
          onChange = {(e)=>setAddress(e.target.value)}
          helperText = {isError? "Please enter your address":""}
          variant="outlined"
          //defaultValue="Doe"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Occupation"
          value = {occupation}
          onChange = {(e)=>setOcc(e.target.value)}
          helperText = {isError? "Please enter your occupation":""}
          variant="outlined"
          //defaultValue="Doe"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <TextField
                
                
                        //error={isError && !purpose}
                        id="outlined-error"
                        label="Enter Date of Birth"
                        type='date'
                        value={patient_DOB}
                        onChange={(e) => setDOB(e.target.value)}
                        helperText={isError? "Please enter DOB" : ""}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />

       
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Age"
          value = {patient_age}
          onChange = {(e)=>setAge(e.target.value)}
          helperText = {isError? "Please enter your age":""}
          variant="outlined"
          //defaultValue="2003-09-15"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Gender: Male or Female"
          value = {patient_gender}
          onChange = {(e)=>setGender(e.target.value)}
          helperText = {isError? "Please enter your gender":""}
          variant="outlined"
          //defaultValue="2003-09-15"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Patient Bloodtype"
          value = {patient_bloodtype}
          onChange = {(e)=>setBloodType(e.target.value)}
          helperText = {isError? "Please enter your bloodtype":""}
          variant="outlined"
          //defaultValue="A+"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Any Prior Pregnancies"
          value = {prior_pregnancies}
          onChange = {(e)=>setPriorPreg(e.target.value)}
          helperText = {isError? "Please enter the number of prior pregnancies":""}
          variant="outlined"
          //defaultValue="2003-09-15"
          fullWidth
        />
        <div style={{ marginBottom: '20px' }}></div>
      <LoadingButton loading={isLoading}
      variant="contained"
      onClick={handleClick} color='secondary'>
  <span>Submit</span>
</LoadingButton>

      
        
      </div>

    </Box>
    </Paper>
    </Container>
  );
}
