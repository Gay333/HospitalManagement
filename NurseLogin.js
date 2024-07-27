import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button} from '@mui/material';
//import { Password } from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
//import axios from axios;
import axios from 'axios';
//import bcrypt from 'bcryptjs';


export default function NurseLogin() {
    //const [value, setValue] = React.useState('');
    const [Error, setError] = React.useState(false);
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const [nurse_id, setNurseID] = React.useState('');
    const [encryptedPassword, setEncryptedPass] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    function gCipher(text) {
      let result = '';
      for(let i = 0; i < text.length; i++) {
          let ascii = text.charCodeAt(i);
          if((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
              let shifted = ascii + 6;
              if((ascii <= 90 && shifted > 90) || (shifted > 122)) {
                  shifted -= 26;
              }
              result += String.fromCharCode(shifted);
          } else {
              result += text[i];
          }
      }
      return result;
  }
  
  function reverseGCipher(text) {
      let result = '';
      for(let i = 0; i < text.length; i++) {
          let ascii = text.charCodeAt(i);
          if((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
              let shifted = ascii - 6;
              if((ascii <= 90 && shifted < 65) || (shifted < 97)) {
                  shifted += 26;
              }
              result += String.fromCharCode(shifted);
          } else {
              result += text[i];
          }
      }
      return result;
  }
  


  
  
      axios.defaults.baseURL = "http://localhost:8080";
  
      const handleClick = async (event) => {
        event.preventDefault();
      
        const password = gCipher(encryptedPassword);
        setEncryptedPass(password);
        //console.log(encryptedPassword);
        
        try {
            //http://localhost:8080
            console.log(nurse_id,password);
            const response = await axios.post(`/nurse/nurselogin/${nurse_id}/${password}`);

            if (response.status === 200) {
                // Login successful, redirect to home page
                //window.location.href = '/home';
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Invalid credentials, show error message
                setError('Invalid credentials');
            }
        }
    };


  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Nurse Login</h1>
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
          label="Enter Nurse ID"
          value = {nurse_id}
          onChange = {(e)=>setNurseID(e.target.value)}
          //helperText = {isError? "Please enter your first name":""}
          variant="outlined"
          //defaultValue="Jane"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
       
      <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
        
          //error={isError}
          id="outlined-error"
          label="Enter Password"
          value = {encryptedPassword}
          onChange = {(e)=>{setEncryptedPass(e.target.value)}}
          type="password" 
          //helperText = {isError? "Passwords do not match":""}
          variant="outlined"
          //defaultValue="2003-09-15"
          fullWidth
        />
        </div>
      <div style={{ marginBottom: '20px' }}></div>
      <LoadingButton loading={isLoading}
      variant="contained"
      onClick={handleClick} color='secondary'>
  <span>Submit</span>
</LoadingButton>
{Error && <p>{Error}</p>}

    </Box>
    </Paper>
    </Container>
  );
}
