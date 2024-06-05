import DataTable from "../../components/dataTable/DataTable";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar";
import "./packages.scss";

const Packages = ({columns}) => {
  return (
    <div>
      <div className="packages">
        <Sidebar />
        <div className="packagesContainer">
          <Navbar />
          <DataTable columns={columns}/>
        </div>
      </div>
    </div>
  )
}

export default Packages