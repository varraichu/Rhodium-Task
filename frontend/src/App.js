import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Car_Form from './pages/Car_Form';
import { Box, Container, Typography } from '@mui/material';

function App() {
  return (
    <Container sx={{py: 2, height: '100%'}}>
        <Box sx={{alignContent: 'center'}}>
          <Typography sx={{textAlign: 'center', fontSize: {
      xs: '2rem', // Font size for extra-small screens
      md: '3rem', // Font size for medium screens and up
    },
    fontWeight: 'bold'}}>
            Rhodium Car Dealers
          </Typography>
        </Box>
        <Routes> 
          <Route path="/" element={<Login/>} />
          <Route path="/carform/:userId" element={<Car_Form/>} />
        </Routes>
    </Container>
  );
}

export default App;
