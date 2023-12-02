import * as React from "react";
import "./waitlist.css";
import { useState, useEffect } from "react";
import WaitTable from "./table.js";
import logo from "./medLogo.svg";
import Grid from "@mui/material/Grid";
import axios from "axios";
import JSONPretty from "react-json-pretty";

function WaitList() {
  const [jsonResponse, setJsonResponse] = useState([]);
  const [waitlistId, setWaitlistId] = useState([]);

  async function getWaitlist(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let res = await axios.get(
        "https://waitlist-microservice-nquae.ondigitalocean.app/",
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      );

      console.log(res.data);
      setJsonResponse(await JSON.stringify(res.data));
    } catch (error) {
      setJsonResponse(JSON.stringify(error));
    }
  }

  async function enterWaitlist(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${JSON.parse(token)}` };
    try {
      let res = await axios.post(
        "https://waitlist-microservice-nquae.ondigitalocean.app/",
        null,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      );
      console.log(res.request);

      console.log(res.data);
      setJsonResponse(await JSON.stringify(res.data));
    } catch (error) {
      setJsonResponse(JSON.stringify(error));
    }
  }

  async function removeFromWaitlist(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      let res = await axios.delete(
        "https://waitlist-microservice-nquae.ondigitalocean.app/",
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
          data: { waitlistId: waitlistId },
        }
      );

      console.log(res.data);
      setJsonResponse(await JSON.stringify(res.data));
    } catch (error) {
      setJsonResponse(JSON.stringify(error));
    }
  }

  return (
    <div>
      <div>
        <button onClick={getWaitlist}>View Waitlist</button>
      </div>
      <div>
        <button onClick={enterWaitlist}>Enter Waitlist</button>
      </div>
      <form onSubmit={removeFromWaitlist}>
        <label>
          <input
            placeholder="WaitList Id"
            type="text"
            onChange={(e) => setWaitlistId(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Remove Patient</button>
        </div>
      </form>
      <JSONPretty
        style={{ fontSize: "2em" }}
        id="json-pretty"
        data={jsonResponse}
        onChange={(e) => setJsonResponse(e.target.value)}
      ></JSONPretty>
    </div>
  );

  //   return (
  //     <Grid>
  //       <Grid container direction="row">
  //         <Grid>
  //           <img src={logo} style={{ height: 80 }} />
  //         </Grid>
  //         <Grid sx={{ height: 80, ml: 1, mt: "8px", color: "white" }}>
  //           <h2>Mister ED</h2>
  //         </Grid>
  //       </Grid>
  //       <Grid sx={{ mt: 1, mx: 3 }}>
  //         <WaitTable />
  //       </Grid>
  //     </Grid>
  //   );
}

export default WaitList;
