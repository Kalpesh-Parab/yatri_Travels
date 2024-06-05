import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Tables from "../../components/tables/Tables"
import "./contacted.scss"

const Contacted = () => {
    const statusFilter = ["Contacted"]

  return (
    <div className="contacted">
        <Sidebar />
        <div className="contactedContainer">
            <Navbar />
            <div className="list">
                <h3 className="listTitle">Contacted</h3>
                <Tables statusFilter={statusFilter}/>
            </div>
        </div>
    </div>
  )
}

export default Contacted