import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(hospital, waitTime) {
  return { hospital, waitTime };
}

async function getWaitlist() {
  const token = localStorage.getItem("token");

  try {
    let res = await axios.get(
      "https://waitlist-microservice-nquae.ondigitalocean.app/",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (error) {
    return error;
  }
}

const HandleWaitlist = async () => {
  const res = await getWaitlist();
  console.log(res);

  console.log(res.data);
  return (
    <h1>Number of patients ahead:{res.data["Number of patients ahead"]}</h1>
  );
};

// HandleWaitlist();

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
  createData("Test", "Test"),
];

export default function WaitTable() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ background: "black", color: "white", fontWeight: "bold" }}
            >
              Emergency Room (Hospital Name)
            </TableCell>
            <TableCell
              sx={{ background: "black", color: "white", fontWeight: "bold" }}
            >
              Estimated Wait Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.hospital}</TableCell>
              <TableCell>{row.waitTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
