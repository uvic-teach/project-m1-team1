import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Questions from "./questions";

export default function TriageForm() {
  const [value, setValue] = React.useState("");
  const [pageNum, setPageNum] = React.useState(1);

  const handleSubmit = (event) => {
    if (value == "Physical Injury") {
      setPageNum(2);
    }
  };

  const QuestionControl = () => {
    if (pageNum == 1) {
      return <Question1 />;
    }
  };

  const Question1 = () => {
    return (
      <RadioGroup value={value}>
        <FormControlLabel
          value="Physical Injury"
          control={<Radio />}
          label="Physical Injury"
        />
        <FormControlLabel
          value="Cold/Flu symptoms"
          control={<Radio />}
          label="Cold/Flu symptoms"
        />
        <FormControlLabel
          value="Infection"
          control={<Radio />}
          label="Infection"
        />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
    );
  };

  const Question2 = () => {
    return (
      <RadioGroup>
        <FormControlLabel
          value="Physical Injury"
          control={<Radio />}
          label="Broken Bone"
        />
        <FormControlLabel
          value="Cold/Flu symptoms"
          control={<Radio />}
          label="Cut or Gash"
        />
        <FormControlLabel
          value="Infection"
          control={<Radio />}
          label="Bruising"
        />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
    );
  };

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
        <Questions />
        <Button sx={{ mr: 50 }} variant="contained" type="submit">
          Submit
        </Button>
      </FormControl>
    </form>
  );
}
