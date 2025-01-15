import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
    <div>
      <form action="">
        <label htmlFor="">
          Email
          <input
            type="text"
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Password
          <input
            type="text"
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  )
}

export default Login
