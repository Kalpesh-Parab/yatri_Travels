import "./notifications.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from "../../components/navbar/Navbar"
import EnquiryStatusTable from "../../components/statusdatatable/StatusDataTable";
import { enquiryColumns } from "../../dataTableSource";

const Notifications = () => {

  const statusFilter = ["Pending"];

  return (
    <div className="notifications">
      <Sidebar />
      <div className="notificationsContainer">
        <Navbar />
        <div className="list">
          <h2>Pending Enquiries</h2>
          <EnquiryStatusTable status="Pending" columns={enquiryColumns} />
        </div>
      </div>
    </div>
  )
}

export default Notifications