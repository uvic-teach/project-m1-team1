import * as React from "react";
import { useState, setState } from "react";
import "./triage.css";
import axios from "axios";
import JSONPretty from "react-json-pretty";

function DoctorTriage() {
  const [jsonResponse, setJsonResponse] = useState([]);

  
  async function handleViewTriages() {
    const token = localStorage.getItem("token");
    try {
      let res = await axios.get(
        "https://triage-microservice-kc8mi.ondigitalocean.app/form",
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      );

      console.log(res.data);
      setJsonResponse(await JSON.stringify(res.data));
    } catch (error) {
      setJsonResponse(JSON.stringify(error));
    }
  }

  return (
    <div className="form">
      <div>
        <button onClick={() => handleViewTriages()} type="submit" class="btn">
          View Triages
        </button>
      </div>
      <JSONPretty
        style={{ fontSize: "1.5em" }}
        id="json-pretty"
        data={jsonResponse}
        onChange={(e) => setJsonResponse(e.target.value)}
      ></JSONPretty>
    </div>
  );
}

export default DoctorTriage;
