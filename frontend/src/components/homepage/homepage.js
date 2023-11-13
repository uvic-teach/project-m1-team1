import React from "react";
import "./homepage.css";
import "./items.css"
import logo from "./medLogo.svg";
import { useNavigate } from "react-router-dom";
import {Button} from '@mui/material';


function Homepage() {
  const navigate = useNavigate();

  const handleWaitlist = () => {
    navigate("/waitlist");
  };

  const handleTriage = () => {
    navigate("/triage");
  };

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
        <div className='link'>
          <Button variant='contained' onClick={handleTriage}>Triage</Button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
