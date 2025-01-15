import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Box, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const userData = {
        "email": email,
        "password": password,
      };

      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      console.log("Login succesful", result);
      navigate('/carform');
    }
    catch (error) {
      console.error('Error logging in:', error.message);
      alert('Error logging in: ' + error.message);
    }
  }
  const signup = async () => {
    try {
      const userData = {
        "email": email,
        "password": password,
      };

      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      alert("Signup succesful", result);
    }
    catch (error) {
      console.error('Error logging in:', error.message);
      alert('Error logging in: ' + error.message);
    }
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
          height: '80vh',
          // width: {
          //   xs: '90%', // Width for extra-small screens
          //   sm: '10%', // Width for small screens
          //   md: '90%', // Width for medium screens
          //   lg: '60%', // Width for large screens
          // },
          textAlign: 'center',
          // px: '10%',
          // bgcolor: 'green'
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: '40vh',
            sm: '60vh',
          }
        }}>

          <Typography sx={{ textAlign: 'left', width: '100%' }}>
            Email
          </Typography>
          <TextField
            id="email"
            label="Enter your email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: '40vh',
            sm: '60vh',
          },
          py: '4'
        }}>
          <Typography sx={{ textAlign: 'left' }}>
            Password
          </Typography>
          <TextField
            id="password"
            label="Enter your password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: '40vh',
            sm: '60vh',
          },
        }}>
          <Button
            variant="contained"
            onClick={login}
            sx={{ mb: 2 }}
          >
            Login
          </Button>

          <Button
            sx={{
              ":hover": { bgcolor: 'lightskyblue' }
            }}
            variant="outlined"
            onClick={signup}
          >
            Sign up
          </Button>

        </Box>
      </Box>
    </Container>
  );
};

export default Login
