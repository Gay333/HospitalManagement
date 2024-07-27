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


export default function NurseAddition() {
    //const [value, setValue] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}
    const [nurse_firstname, setFirstName] = React.useState('');
    const [nurse_lastname, setLastName] = React.useState('');
    const [nurse_phone, setPhone] = React.useState('');
    const [nurse_address, setAddress] = React.useState('');
    const [nurse_id, setNurseID] = React.useState('');
    //const [dob, setDOB] = React.useState('');
    //const [age, setAge] = React.useState(0);
    //const [gender, setGender] = React.useState('');
    onst [password, setPass] = React.useState('');
    const [checkPass, setCheckPass] = React.useState('');
    const [hospital_id, setHos] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const bcrypt = require('bcryptjs');
    const [result, useResult] = React.useState('');

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
  


    
      //const patient_dob = format(patient_dob, 'yyyy-MM-dd');
  
  
      axios.defaults.baseURL = "http://localhost:8080";
  
      const handleClick = () => {
        const newNurse = generateId();
        setNurseID(newNurse); 
        //const password = document.getElementById('password').value;
        const encryptedPassword = gCipher(password);
        setPass(encryptedPassword);

        //const passwordInput = document.getElementById('password').value;
        //document.getElementById('password').innerText = gCipher(passwordInput);
        
        //let password = await hashPassword(password);
      };
      
      
      useEffect(() => {
        if (nurse_id) {
          setIsLoading(true);
          const nurseData = {
            nurse_id,        nurse_firstname,        nurse_lastname,        nurse_phone,        nurse_address,        hospital_id,       password };
          axios.post('http://localhost:8080/nurse/addNurse', nurseData, {
            headers: {
              'Content-Type': 'application/json'        },      
              withCredentials: true
            })      .then(response => {
              if (response.headers['content-type'].includes('text/html')) {
                throw new Error('Received HTML response instead of JSON');
              }
              console.log("Nurse Added!", response.data);
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
      }, [nurse_id, nurse_firstname, nurse_lastname, nurse_phone, nurse_address, hospital_id, password]);
  
    
/*
    const handleClick = () => {
      const nurse_id = uuidv4();
      setNurseID(generateId());
      setIsLoading(true);
      //const { nurse_ID, nurse_firstName, nurse_lastName, nurse_phone, nurse_address, password, hospital_ID } = nurseData;
  
  // Now you can safely use await since it's within an async function
      const hashedPassword = hashPassword(password);

      const nurse = {
          nurse_id,
          nurse_firstname,
          nurse_lastname,
          nurse_phone,
          nurse_address,
          password: hashedPassword, // Use the hashed password
          hospital_id
        };
      
      fetch("http://localhost:8080/nurse/addNurse",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(nurse)

      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Nurse Added!", data);
        setIsLoading(false);
        // Reset form or perform other actions upon success
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        setIsError(true);
        setIsLoading(false);
        // Handle errors, such as displaying a message to the user
      });
    
      // Perform any async operation here (e.g., form submission)
      // After the operation is complete, set isLoading to false
    };
*/
    function generateId() {
      return uuidv4(); // Generates a unique ID
    }
  


      const checkPasswords = () => {
          setIsError((password!==checkPass));
      };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
      <h1>Nurse Registration</h1>
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
          label="Enter Nurse First Name"
          value = {nurse_firstname}
          onChange = {(e)=>setFirstName(e.target.value)}
          //helperText = {isError? "Please enter your first name":""}
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
          label="Enter Nurse Last Name"
          value = {nurse_lastname}
          onChange = {(e)=>setLastName(e.target.value)}
          //helperText = {isError? "Please enter your last name":""}
          variant="outlined"
          //defaultValue="Doe"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Nurse Phone Number"
          value = {nurse_phone}
          onChange = {(e)=>setPhone(e.target.value)}
          //helperText = {isError? "Please enter your phone number":""}
          variant="outlined"
          //defaultValue="9001234532"
          fullWidth
        />
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Nurse Address"
          value = {nurse_address}
          onChange = {(e)=>setAddress(e.target.value)}
          //helperText = {isError? "Please enter your address":""}
          variant="outlined"
          //defaultValue="Doe"
          fullWidth
        />
        </div>
        <div style={{ marginBottom: '20px' }}></div>
        <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
          //error={isError}
          id="outlined-error"
          label="Enter Hospital ID"
          value = {hospital_id}
          onChange = {(e)=>setHos(e.target.value)}
          //helperText = {isError? "Please enter the Hospital ID":""}
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
          label="Enter Password"
          value = {password}
          onChange = {(e)=>{setPass(e.target.value)}}
          type="password" 
          //helperText = {isError? "Passwords do not match":""}
          variant="outlined"
          //defaultValue="2003-09-15"
          fullWidth
        />
      
        
      </div>
      <div style={{ marginBottom: '20px' }}></div>
        <div>
        <TextField
        
        error={isError && password !== checkPass}
          id="outlined-error"
          label="Check Password"
          type="password" 
          value = {checkPass}
          onChange = {(e)=>{setCheckPass(e.target.value); 
            checkPasswords();
          }}
          
          helperText = {isError? "Passwords do not match":""}
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


    </Box>
    </Paper>
    </Container>
  );
}
