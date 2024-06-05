import { useEffect, useState } from "react"
import "./assignedTable.scss"
import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const AssignedTable = () => {
    const [assignedEnquiries, setAssignedEnquiries] = useState([]);
    const [loggedInUsername, setLoggedInUsername] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.username) {
        setLoggedInUsername(userData.username);
      }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/enquiry/get/${user.username}`);
                const fetchedEnquiries = response.data.enquiries || []; 
                setAssignedEnquiries(fetchedEnquiries);
            } catch (error) {
                console.error("Error fetching assigned enquiries: ", error)
            }
        };

        fetchData();
    }, [user.username]);

    console.log(loggedInUsername)
    console.log(assignedEnquiries)

    return(
        <TableContainer component={Paper} className="table">
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Enquiry ID</TableCell>
                        <TableCell className="tableCell">Full Name</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Phone</TableCell>
                        <TableCell className="tableCell">Destination</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                        <TableCell className="tableCell">Assigned To</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignedEnquiries.map((enquiry) => (
                        <TableRow key={enquiry._id}>
                            <TableCell className="tableCell">{enquiry._id}</TableCell>
                            <TableCell className="tableCell">{enquiry.userName}</TableCell>
                            <TableCell className="tableCell">{enquiry.emailID}</TableCell>
                            <TableCell className="tableCell">{enquiry.phoneNo}</TableCell>
                            <TableCell className="tableCell">{enquiry.destinationName}</TableCell>
                            <TableCell className="tableCell" component={Link} to={`/enquiry/${enquiry._id}`} style={{textDecoration: "none"}}>
                                <span className={`status ${enquiry.status.toLowerCase()}`}>{enquiry.status}</span>
                            </TableCell>
                            <TableCell className="tableCell">{enquiry.assignedTo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AssignedTable;