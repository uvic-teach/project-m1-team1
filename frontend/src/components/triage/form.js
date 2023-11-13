import * as React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function TriageForm() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Grid sx={{ background: "white" }}>
            <Paper sx={{ height: 650 }} elevation={10}>
                <Grid>
                    <FormControl sx={{ margin: 8, width:200}}>
                        
                    </FormControl>
                </Grid>
            </Paper>
        </Grid>
    );
}