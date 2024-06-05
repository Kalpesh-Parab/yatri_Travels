import DataTable from "../../components/dataTable/DataTable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { enquiryColumns } from "../../dataTableSource"
import "./enquiry.scss"

const Enquiry = () => {
  return (
    <div className="enquiry">
      <Sidebar />
      <div className="enquiryContainer">
        <Navbar />
        <DataTable columns={enquiryColumns} />
      </div>
    </div>
  )
}

export default Enquiry