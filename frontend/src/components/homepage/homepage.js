import React from "react";
import "./homepage.css";
import Item from "./items";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function Homepage() {
  const isAuth = useAuth();

  const items = [
    { id: 1, feature: "Waitlist" },
    { id: 2, feature: "Triage" },
  ];
if(isAuth)
  return( <div class="wrap">
    <div className="board"><Item feature ={items[0].feature }> </Item></div>
    <div className="board"><Item feature ={items[1].feature }> </Item></div>
  </div>)
else return(<Navigate to="/"/>)
}

export default Homepage;
