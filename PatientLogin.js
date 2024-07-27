import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper ,Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';


export default function PatientLogin() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const [isError, setIsError] = React.useState(false);
    const [patient_phone, setPhone] = React.useState('');


    return(
        <Container>
            <Paper elevation={3} style={paperStyle}>
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >

        <div>
            <h1>Welcome to Care Medi</h1>
        </div>

        <div style={{gap: '16px' }}>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Patient Phone Number"
          
          value = {patient_phone}
          onChange = {(e)=>setFirstName(e.target.value)}
          helperText = {isError? "Please enter your phone number":""}
          variant="outlined"
          //defaultValue="Jane"
          fullWidth
        />
        </div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="OTP Recieved"
          
          value = {patient_firstName}
          onChange = {(e)=>setFirstName(e.target.value)}
          helperText = {isError? "Please enter the OTP":""}
          variant="outlined"
          //defaultValue="Jane"
          fullWidth
        />
        </Box>

            </Paper>

        </Container>


    );
}

