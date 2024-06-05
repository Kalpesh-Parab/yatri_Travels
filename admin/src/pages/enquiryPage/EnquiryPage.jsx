import { useLocation } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./enquiryPage.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";
import AdminProfiles from "../../components/adminProfiles/AdminProfiles"

const EnquiryPage = () => {

  const location = useLocation();
  const enquiryId = location.pathname.split("/")[2];
  const [enquiryData, setEnquiryData] = useState(null)
  const [remarks, setRemarks] = useState("");

  const {user} = useContext(AuthContext)
  console.log(user);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await axios.get(`/enquiry/${enquiryId}`);
        setEnquiryData(response.data);
      } catch (error) {
        console.error("Error fetching enquiry:", error);
      }
    };
    fetchEnquiry();
  }, [enquiryId]);

  if(!enquiryData) return <div>Loading...</div>



  const handleStatusUpdate = async (status) => {
    try {
      const adminName = user.username;
      await axios.put(`/enquiry/update/${enquiryId}`, {
        status,
        handledByName: adminName,
      });
      setEnquiryData({...enquiryData, status, handledByName: adminName})
      window.location.reload()
    } catch (error) {
      console.error(`Error updating status to ${status}`,error)
    }
  }

  const handleContacted = () => handleStatusUpdate("Contacted");
  const handleChecked  = () => handleStatusUpdate("Checked") ;

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleUpdateRemarks = async () => {
    try {
      await axios.put(`/enquiry/remark/${enquiryId}`, {
        remarks,
      });
      window.location.reload()
    } catch (error) {
      console.error("Error updating remarks:", error);
    }
  };

  console.log(remarks)

  return (
    <div className="enquiryPage">
      <Sidebar />
      <div className="enquiryPageContainer">
        <Navbar />
        <div className="enquiries">
          <div className="enquiryBox">
            <div className="enquiryButtons">
              <button className="contacted" onClick={handleContacted}>Contacted</button>
              <button className="checked" onClick={handleChecked}>Checked</button>
            </div>
            <div>
              <h2>Enquiry Details</h2>
              {enquiryData && (
                <div>
                  <p><strong>User Name:</strong> {enquiryData.userName}</p>
                  <p><strong>Phone Number:</strong> {enquiryData.phoneNo}</p>
                  <p><strong>Email ID:</strong> {enquiryData.emailID}</p>
                  <p><strong>Destination:</strong> {enquiryData.destinationName}</p>
                  <p><strong>Package Type:</strong> {enquiryData.packageType}</p>
                  <p><strong>Price:</strong> {enquiryData.price}</p>
                  <p><strong>Options:</strong> {enquiryData.options}</p>
                  <p><strong>Query:</strong> {enquiryData.query}</p>
                  <p><strong>Date:</strong> {enquiryData.date}</p>
                  <p><strong>Days:</strong> {enquiryData.days}</p>
                  <p><strong>Status:</strong> {enquiryData.status}</p>
                  <p><strong>Remarks:</strong> {enquiryData.remarks}</p>
                </div>
              )}
            
              <div className="detailItem">
                <span className="itemKey"><strong>Handled By: </strong> </span>
                <span className="itemValue">{enquiryData?.handledByName || "Not Handled."}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey"><strong>Assigned To: </strong></span>
                <span className="itemValue">{enquiryData?.assignedTo || "Not Assigned."}</span>
              </div>
              <div className="detailItem">
                <strong>
                  <label htmlFor="remarks">Remarks:</label>
                </strong>
                <input
                  className="inputRemark"
                  type="text"
                  id="remarks"
                  name="remarks"
                  value={remarks}
                  onChange={handleRemarksChange}
                />
              </div>
              <button className="remarks" onClick={handleUpdateRemarks}>Update Remarks</button>
            </div>
            <div>
              <AdminProfiles/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquiryPage 