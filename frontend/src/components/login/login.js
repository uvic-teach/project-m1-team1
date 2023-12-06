import React from "react";
import "./login.css";
import logo from "./medLogo.svg";
import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();



      async function loginUser(credentials) {
    try {
      let res = await axios.post(
        "https://auth-microservice-l5b7m.ondigitalocean.app/login",
        {
          username: credentials.username,
          password: credentials.password,
        }
      );
      return res;
    } catch (error) {
      return error;
        }
  }

  const { setToken } = useAuth();
  
  const navigate = useNavigate();

const handleLogin = async () => {
    const res = await loginUser({ username, password });
    console.log(res);

    if (res.status === 200) {
      console.log(res.data.auth_token);
      setToken(res.data.auth_token);
      localStorage.setItem('role', res.data.role);
      //navigate("/homepage");
      navigate("/", { replace: true });
    }
     else {
     setError('Invalid Username or Password');

     }
  };

  const handleRegistration = async () => {
    navigate("/register", { replace: true });
  };

  return (
    <div className="loginPage">
      <header className="Login-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Mister ED</p>
      </header>
      <div className="Login-Text-Area">
     
        <div className="Text-Box">
          <TextField
            label="Username"
            id="outlined-required"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          ></TextField>
           
        </div>
        <div className="Text-Box">
          <TextField
            label="Password"
            id="outlined-adornment-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
           
        </div>
        <div className="Error">{error? <label>{error}</label>: null}</div>
        <div className="Login-Buttons">
          <Button variant="contained" onClick={handleRegistration}>
            Register
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
         
        </div>
      </div>
    </div>
  );
}


export default Login;
