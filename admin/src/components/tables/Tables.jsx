import "./tables.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { enquiryColumns } from "../../dataTableSource";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Tables = ({statusFilter, userIdFilter, assignedToFilter}) => {

  const [enquiryData, setEnquiryData] = useState([]);

  useEffect(() => {
    
    const fetchEnquiries = async () => {
      try {
      
        const response = await axios.get("/enquiry");
        console.log(response)
        
        const sortedData = response.data.reverse()
        setEnquiryData(sortedData)        
      } catch (error) {
        console.error("Error fetchong enquiries: ",error)
      }
    };
    
    const fetchUserId = async () => {
      try {
       
        const response = await axios.get(`/enquiry/user/${userIdFilter}`)
        setEnquiryData(response.data)        
      } catch (error) {
        console.error("Error fetching enquiries: ",error)
      }
    };

    if(userIdFilter){
      fetchUserId()
    } else{
      fetchEnquiries();
    }
  },[userIdFilter])

  console.log(enquiryData);

  const filteredColumns = enquiryColumns.filter(column => column.field !== "handledByName");

  return(
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {filteredColumns.map((column) => (
              <TableCell key={column.field} className="tableCell">{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { enquiryData.length === 0 ? (
            <TableCell className="noRows" colSpan={enquiryColumns.length} align="center">No rows</TableCell>
          ) : (
            enquiryData
          .filter((enquiry) => statusFilter.includes(enquiry.status))
          .map((enquiry) => (
            <TableRow key={enquiry._id}>
      
              <TableCell className="tableCell">{enquiry.userName}</TableCell>
              <TableCell className="tableCell">{enquiry.phoneNo}</TableCell>
              <TableCell className="tableCell">{enquiry.emailID}</TableCell>
              <TableCell className="tableCell">{enquiry.date}</TableCell>
              <TableCell className="tableCell">{enquiry.destinationName}</TableCell>
              
              <TableCell className="tableCell" component={Link} to={`/enquiry/${enquiry._id}`} style={{textDecoration: "none"}}>
                <span className={`status ${enquiry.status.toLowerCase()}`}>{enquiry.status}</span>
              </TableCell>
            </TableRow>)
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Tables