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
import { Typography } from "@mui/material";

export default function Questions() {
    return (
        <RadioGroup >
            <FormControlLabel value="Physical Injury" control={<Radio />} label="Physical Injury" />
            <FormControlLabel value="Cold/Flu symptoms" control={<Radio />} label="Cold/Flu symptoms" />
            <FormControlLabel value="Infection" control={<Radio />} label="Infection" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
    );
};