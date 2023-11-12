import * as React from "react";
import "./waitlist.css";
import WaitTable from "./table.js";
import logo from './medLogo.svg';
import Grid from '@mui/material/Grid'



function WaitList() {
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
            <Grid sx={{mt:1, mx:3}}>
                <WaitTable/>
            </Grid>
        </Grid>
    );
}

export default WaitList;