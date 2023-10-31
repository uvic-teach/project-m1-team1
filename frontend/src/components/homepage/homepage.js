import React from "react";
import "./homepage.css";
import Item from "./items";

function Homepage() {
  const items = [
    { id: 1, feature: "Waitlist" },
    { id: 2, feature: "Triage" },
  ];

  return <div>
    <Item items ={items[0] }> </Item >
    <Item items ={items[1] }> </Item>
  </div>;
}

export default Homepage;
