import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Questions from "./questions";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

export default function TriageForm() {
  const [value, setValue] = React.useState("");
  const [s1, setS1] = React.useState("");
  const [s2, setS2] = React.useState("");
  const [s3, setS3] = React.useState("");
  const [c1, setC1] = React.useState("");
  const [c2, setC2] = React.useState("");
  const [c3, setC3] = React.useState("");

  const handleSubmit = (event) => {
    console.log(s1);
  };

  /*
  const handleS1 = (event) => {
    setS1("Cough");
  };
  */

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="standard">
        <FormLabel sx={{ fontSize: 24, fontWeight: 600 }}>
          Nature of injury
        </FormLabel>
        <FormLabel>
          Please choose an option that best fits the nature of your injury or
          medical concern
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox 
              //onChange={handleS1}
            />}
            label="Cough"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Heache"
          />
          <FormControlLabel
            value="Infection"
            control={<Checkbox />}
            label="Infection"
          />
          <FormControlLabel value="Other" control={<Checkbox />} label="Other" />
        </FormGroup>
        <Button sx={{ mr: 50 }} variant="contained" type="submit">
          Submit
        </Button>
      </FormControl>
    </form>
  );
}
