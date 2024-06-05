import "./checked.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from "../../components/navbar/Navbar"
import EnquiryStatusTable from "../../components/statusdatatable/StatusDataTable";
import { enquiryColumns } from "../../dataTableSource";

const Checked = () => {

 
  return (
    <div className="notifications">
      <Sidebar />
      <div className="notificationsContainer">
        <Navbar />
        <div className="list">
          <h2>Checked Enquiries</h2>
          <EnquiryStatusTable status="Checked" columns={enquiryColumns} />
        </div>
      </div>
    </div>
  )
}

export default Checked