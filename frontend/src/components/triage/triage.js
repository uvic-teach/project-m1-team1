import * as React from "react";
import logo from './medLogo.svg';
import Grid from '@mui/material/Grid';
import TriageForm from "./form";

export default function Triage() {
    return (
        <Grid>
            <Grid container direction="row">
                <Grid>
                    <img src={logo} style={{ height: 80 }} />
                </Grid>
                <Grid sx={{ height: 80, ml: 1, mt: "8px", color: "white" }}>
                    <h2>Mister ED</h2>
                </Grid>
            </Grid>
            <Grid sx={{ mt: 1, mx: 3 }}>
                <TriageForm/>
            </Grid>
        </Grid>
    );
}