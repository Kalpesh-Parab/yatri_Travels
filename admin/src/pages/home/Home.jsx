import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Tables from "../../components/tables/Tables";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {

  const [userCount, setUserCount] = useState(0);
  const [packageCount, setPackageCount] = useState(0);
  const [enquiryCount, setEnquiryCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);
  const statusFilter = ["Pending","Checked"];
  const fetchCounts = async () => {
    try {
        const userResponse = await fetch('/users/doc/count');
        const userData = await userResponse.json();
        setUserCount(userData.totalCount);

      const packageResponse = await fetch('/packages/doc/count');
      const packageData = await packageResponse.json();
      setPackageCount(packageData.totalCount);

      const enquiryResponse = await fetch('/enquiry/doc/count');
      const enquiryData = await enquiryResponse.json();
      setEnquiryCount(enquiryData.totalCount);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  console.log("userCount : ",userCount)
  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
          <Widget type="user" count={userCount} />
          <Widget type="package" count={packageCount} />
          <Widget type="enquiry" count={enquiryCount} />
        </div>
          <div className="listContainer">
            <div className="listTitle">Enquiries</div>
            <Tables statusFilter={statusFilter}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
