import React from "react";
import "./homepage.css";
import Item from "./items";
<<<<<<< HEAD
import logo from "./medLogo.svg"
=======
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
>>>>>>> 651552a (fixed homepage bug)

function Homepage() {
  const isAuth = useAuth();

  const items = [
    { id: 1, feature: "Waitlist" },
    { id: 2, feature: "Triage" },
  ];
<<<<<<< HEAD

  return <div className="HomePage">
    <header className="Home-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
          Mister ED
      </p>
    </header>
    <div className="square-list">
      <Item feature ={items[0].feature }> </Item>
      <Item feature ={items[1].feature }> </Item>
    </div>
  </div>

=======
if(isAuth)
  return( <div class="wrap">
    <div className="board"><Item feature ={items[0].feature }> </Item></div>
    <div className="board"><Item feature ={items[1].feature }> </Item></div>
  </div>)
else return(<Navigate to="/"/>)
>>>>>>> 651552a (fixed homepage bug)
}

export default Homepage;
