import React from "react";
import "./homepage.css";
import "./items.css"
import logo from "./medLogo.svg";
import { useNavigate } from "react-router-dom";
import {Button} from '@mui/material';
import { useAuth } from "../../context/AuthProvider";


function Homepage() {
  const navigate = useNavigate();
  const {setToken} = useAuth();
  const handleWaitlist = () => {
    navigate("/waitlist");
  };

  const handleTriage = () => {
    if(localStorage.getItem('role') == 'None'){
      navigate("/triage");
    }
    else{
      navigate("/doctorTriage")
    }
  };
  const handleLogout =()=>{
    
    setToken();
    setTimeout(navigate("/login", {replace:true}), 3000);
    
}

  return (
    <div className="HomePage">
      <header className="Home-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Mister ED</p>
      </header>
      <div className="square-list">
        <div className='link'>
          <Button variant='contained' onClick={handleWaitlist}>WaitList</Button>
        </div>
        <div className='link' >
          <Button variant='contained' onClick={handleTriage}>Triage</Button>
        </div>
        <div className='link'>
          <Button variant='contained' onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
