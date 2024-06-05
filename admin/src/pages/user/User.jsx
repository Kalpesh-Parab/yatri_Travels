import "./user.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";

const User = () => {

    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [userData, setUserData] = useState(null);
    const [userEnquiries, setUserEnquiries] = useState([]);
    const [isAdminUpdated, setIsAdminUpdated] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await axios.get(`/users/${userId}`);
                setUserData(response.data);
                const enquiryRes = await axios.get(`/enquiry/user/${userId}`);
                setUserEnquiries(enquiryRes.data.enquiries);
            } catch(error){
                console.error("Error fetching user data",error);
            }
        };

        if(userId){
            fetchUserData();
        }
    },[userId, isAdminUpdated]);

    const handleAdminUpdate = async () => {
        try {
            const updatedUser = {...userData, isAdmin: !userData.isAdmin};
            await axios.put(`/users/${userId}`,updatedUser);
            setIsAdminUpdated(true)
            setUserData(updatedUser)
            toast.success("Admin status updated successfully!");
        } catch (error) {
            console.error("Error updating status", error)
            toast.error("Failed to update admin status");
        }
    }

    if(!userData) return <div>Loading...</div>
    console.log(userData);

    console.log(userEnquiries)
  return (
    <div className="user">
        <Sidebar />
        <div className="userContainer">
            <Navbar />
            <div className="profile_">
                <div className="userBox">
                    <button className={`adminBtn ${userData.isAdmin? 'removeAdmin' : 'makeAdmin'}`} onClick={handleAdminUpdate}>{userData.isAdmin ? "Remove Admin" : "Make Admin"}</button>
                    <h1 className="title">User Profile</h1>
                    <div className="userDetails">
                        <div className="detailItem">
                            <span className="itemKey">Username: </span>
                            <span className="itemValue">{userData.username}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Email: </span>
                            <span className="itemValue">{userData.email}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Mobile  Number: </span>
                            <span className="itemValue">{userData.phone}</span>
                        </div>
                        <div className="detailItem">
                            <span className="itemKey">Is Admin?: </span>
                            <span className="itemValue">{userData.isAdmin ?  "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
                <div className="enquiriesBox">
                    <h2 className="enquiryTitle">Enquiries</h2>
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
                                {userEnquiries.map((enquiry) => (
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default User