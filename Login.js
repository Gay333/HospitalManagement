import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper ,Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';


export default function Login() {
    const paperStyle={padding:'50px 20px',width:600,margin:"20px auto"}

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
        <Button  variant="contained" color='secondary' style={{ margin: '0 8px' }}>Patient</Button>
        <Button  variant="contained" color='secondary' style={{ margin: '0 8px' }}>Nurse</Button>
        <Button  variant="contained" color='secondary' style={{ margin: '0 8px' }}>Admin</Button>
        </div>
        </Box>

            </Paper>

        </Container>


    );
}

