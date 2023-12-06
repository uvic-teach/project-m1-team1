import * as React from "react";
import { useState, setState } from "react";
import "./triage.css";
import axios from "axios";
import JSONPretty from "react-json-pretty";

function DoctorTriage() {
  const [allchecked, setAllChecked] = React.useState([]);
  const [jsonResponse, setJsonResponse] = useState([]);

  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }

  // const handleSubmit = () => {
  //   for (let i = 0; i < allchecked.length; i++) {
  //     body[allchecked[i]] = "true";
  //   }
  //   console.log(body);
  //   console.log(allchecked);
  // };

  async function handleSubmitTriage() {
    const body = {
      Symptom1: null,
      Symptom2: null,
      Symptom3: null,
      Condition1: null,
      Condition2: null,
      Condition3: null,
    };
    for (let i = 0; i < allchecked.length; i++) {
      body[allchecked[i]] = "true";
    }
    console.log(body);

    const token = localStorage.getItem("token");
    try {
      let res = await axios.post(
        "https://triage-microservice-kc8mi.ondigitalocean.app/form",
        body,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      );
      console.log(res.request);

      console.log(res.data);
      setJsonResponse(await JSON.stringify(res.data));
    } catch (error) {
      setJsonResponse(JSON.stringify(error));
    }
  }

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
