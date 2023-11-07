import React from "react";
import "./login.css";
import logo from "./medLogo.svg";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function UserNameHandler(event) {
    setUserName(event.target.value);
  }

  function PasswordHandler(event) {
    setPassword(event.target.value);
  }

  function PrintUserName() {
    console.log(UserName);
  }

  var loginInfo = {
    username: "",
    password: "",
  };

  async function loginRequest() {
    loginInfo.username = UserName;
    loginInfo.password = Password;

   const response = await axios
      .post("https://seng350-team1-auth.azurewebsites.net/login", loginInfo)
      
    
    if(response?.status === 200){
        setIsLoggedIn(true);
        setAuthUser({
            username: UserName,
            authToken: response.data['auth_token']

        })

        console.log(authUser)
    }

    if(location.state?.from){
        navigate(location.state.from);
    }

      
  }

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Mister ED</p>
        <form>
          <label>Username</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={UserName}
            onChange={UserNameHandler}
          />
        </form>
        <form>
          <label>Password</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={Password}
            onChange={PasswordHandler}
          />
        </form>
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={loginRequest}
        >
          <button className="Login-Button">Login</button>
        </a>
        <a
          className="App-link"
          href="./LoginPage.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="Register-Button">Register</button>
        </a>
      </header>
    </div>
  );
}

export default Login;
