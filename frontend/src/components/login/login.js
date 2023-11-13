import React from "react";
import "./login.css";
import logo from "./medLogo.svg";
import { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser({ username, password });
    console.log(res);

    if (res.status === 200) {
      localStorage.setItem('token', res.data.auth_token);
      navigate("/homepage");
    } else {
      navigate("/")
    }
  };

  return (
    <div className="loginPage">
      <header className="Login-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mister ED
        </p>
      </header>
      <div className="Login-Text-Area">
        <div className="Text-Box">
          <TextField 
          label='Username' 
          id="outlined-required"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          ></TextField>
        </div>
        <div className="Text-Box">
          <TextField 
          label='Password' 
          id="outlined-adornment-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ></TextField>
        </div>
        <div className="Login-Buttons">
          <Button variant="contained">Register</Button>
          <Button 
          variant="contained"
          onClick={handleLogin}
          >Login</Button>
        </div>
      </div>
    </div >
  );
}

export default Login;
