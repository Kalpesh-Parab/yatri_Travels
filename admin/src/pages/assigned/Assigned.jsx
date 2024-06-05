import AssignedTable from "../../components/assignedTable/AssignedTable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./assigned.scss"

const Assigned = () => {
  return (
    <div className="assigned">
      <Sidebar />
      <div className="assignedContainer">
        <Navbar />
        <div className="list">
          <div className="listTitle">Assigned Enquiries</div>
          <AssignedTable />
        </div>
      </div>
    </div>
  )
}

export default Assigned