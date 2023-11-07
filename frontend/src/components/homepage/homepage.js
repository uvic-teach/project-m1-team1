import React from "react";
import "./homepage.css";
import Item from "./items";

function Homepage() {
  const items = [
    { id: 1, feature: "Waitlist" },
    { id: 2, feature: "Triage" },
  ];

  return <div class="wrap">
    <div class="board"><Item feature ={items[0].feature }> </Item></div>
    <div class="board"><Item feature ={items[1].feature }> </Item></div>
  </div>
}

export default Homepage;
