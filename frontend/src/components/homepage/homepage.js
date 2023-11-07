import React from "react";
import "./homepage.css";
import Item from "./items";
import logo from "./medLogo.svg"

function Homepage() {
  const items = [
    { id: 1, feature: "Waitlist" },
    { id: 2, feature: "Triage" },
  ];

  return <div className="HomePage">
    <header className="Home-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
          Mister ED
      </p>
    </header>
    <div className="square-list">
      <div class="board"><Item feature ={items[0].feature }> </Item></div>
      <div class="board"><Item feature ={items[1].feature }> </Item></div>
    </div>
  </div>

}

export default Homepage;
