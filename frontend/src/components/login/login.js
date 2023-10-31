import React from "react";
import './login.css';
import logo from './medLogo.svg';
import { useState } from "react";
import axios from 'axios';

function Login() {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");

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
        loginInfo.username = UserName
        loginInfo.password = Password

        axios.post('https://seng350-team1-auth.azurewebsites.net/login', loginInfo)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Mister ED
                </p>
                <form>
                    <label>Username</label>
                    <input type="text" id="fname" name="fname" value={UserName} onChange={UserNameHandler} />
                </form>
                <form>
                    <label>Password</label>
                    <input type="text" id="fname" name="fname" value={Password} onChange={PasswordHandler} />
                </form>
                <a
                    className="App-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={loginRequest}
                >
                    <button
                        className="Login-Button"
                    >
                        Login
                    </button>
                </a>
                <a
                    className="App-link"
                    href="./LoginPage.js"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="Register-Button"
                    >
                        Register
                    </button>
                </a>
            </header>
        </div>
    );
}

export default Login;

