import * as React from "react";
import "./waitlist.css";
import { styled } from '@mui/material/styles';
import Logo from "./medLogo.svg";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(hospital, waitTime) {
    return { hospital, waitTime };
}

const rows = [
    createData("Jubilee", "2 hours"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test"),
    createData("Test", "Test")
];

function WaitList() {
    return (
        <div>
            <div className="WaitList-Header">
                <img src={Logo} className="WaitList-Logo"></img>
                <header className="WaitList-Title">Mister ED</header>
            </div>
            <div className="WaitList-Body">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }}>
                        <TableHead sx={{ fontWeight: 1000 }}>
                            <TableCell sx={{ fontWeight: 900 }}>Emergency Room (Hospital Name)</TableCell>
                            <TableCell sx={{ fontWeight: 900 }}>Estimated Wait Time</TableCell>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell >{row.hospital}</TableCell>
                                    <TableCell >{row.waitTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>
        </div>
    );
}

export default WaitList;