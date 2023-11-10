import React from "react";
import "./login.css";
import logo from "./medLogo.svg";
import { useState } from "react";
<<<<<<< HEAD
import axios from 'axios';
import { TextField, Button } from '@mui/material';
=======
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../error_page";
import ErrorBoundary from "../../error_page";
>>>>>>> 651552a (fixed homepage bug)

function Login() {
  //const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 651552a (fixed homepage bug)

  function UserNameHandler(event) {
    setUserName(event.target.value)
  }

  function PasswordHandler(event) {
    setPassword(event.target.value)
  }

  function PrintUserName() {
    console.log(UserName)
  }

  var loginInfo = {
    "username": "",
    "password": ""
  }

  async function loginRequest() {
<<<<<<< HEAD
    loginInfo.username = UserName
    loginInfo.password = Password

    axios.post('https://seng350-team1-auth.azurewebsites.net/login', loginInfo)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
=======
    loginInfo.username = UserName;
    loginInfo.password = Password;
  
  try{
    const response = await axios
      .post("https://seng350-team1-auth.azurewebsites.net/login", loginInfo);
      
      if(response?.status === 200){
        setIsLoggedIn(true);
        setAuthUser({
            username: UserName,
            authToken: response.data['auth_token']

        });

        console.log(authUser);
        navigate("/home");
    }
      
>>>>>>> 651552a (fixed homepage bug)
  }
  catch(e){
    return <ErrorPage />
  }
    
     
  }

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
          value={UserName}
          onChange={UserNameHandler}
          ></TextField>
        </div>
        <div className="Text-Box">
          <TextField 
          label='Password' 
          id="outlined-required"
          value={Password}
          onChange={PasswordHandler}
          ></TextField>
        </div>
        <div className="Login-Buttons">
          <Button variant="contained">Register</Button>
          <Button 
          variant="contained"
          onClick={loginRequest}
          >Login</Button>
        </div>
      </div>
    </div >
  );
}

export default Login;
