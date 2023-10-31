import React from "react";
import "./homepage.css";
import Item from "./items";

function Homepage() {
  const items = [
    { id: 1, feature: "Waitlist" },
    { id: 2, feature: "Triage" },
  ];

  return <div className="square-list">
    <Item feature ={items[0].feature }> </Item>
    <Item feature ={items[1].feature }> </Item>
  </div>;
}

export default Homepage;
