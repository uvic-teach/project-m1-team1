import * as React from "react";
import logo from "./medLogo.svg";
import Grid from "@mui/material/Grid";
import TriageForm from "./form";
import { Paper } from "@mui/material";
import Typography from "@mui/material";

export default function Triage() {
  return (
    <Grid container direction="column">
      <Grid container direction="row">
        <Grid>
          <img src={logo} style={{ height: 80 }} />
        </Grid>
        <Grid sx={{ height: 80, ml: 1, mt: "8px", color: "white" }}>
          <h2>Mister ED</h2>
        </Grid>
      </Grid>
      <Paper sx={{ mx: 4, minHeight: 400 }}>
        <Grid container direction="column">
          <Grid sx={{ fontSize: 28, ml: 4, pt: 1 }}>Triage Questionnaire</Grid>
          <Grid alignSelf="center">
            <TriageForm />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
