import "./dataTable.scss";
import {DataGrid} from "@mui/x-data-grid";
import { Link, useLocation} from "react-router-dom";
import {useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";

const DataTable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);  
  const {data} = useFetch(`/${path}`);
  const dataGridRef = useRef(null);
  const isEnquiryPage = location.pathname === "/enquiry";
  
  useEffect(() => {
    setList(data)
  },[data]);
  
  
  const [adminNames, setAdminNames] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(""); 
 
  useEffect(() => {
    const fetchAdminNames = async () => {
      try {
        const response = await axios.get("/users/doc/admins");
        setAdminNames(response.data);
      } catch (error) {
        console.error("Error fetching admin names:", error);
      }
    };
  
    if (isEnquiryPage) {
      fetchAdminNames();
    }
  }, [isEnquiryPage]);
  

  const handleDelete = async(id) =>{
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter(item=> item._id !== id))
    } catch (error) {
      console.error("Error deleting item",error)
    }
  }

    const actionColumn=[
      {
        field:  'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) =>{
            return(
                <div className="cellAction">
                  <Link to={`/${path}/${params.row._id}`} style={{'textDecoration':'none'}}>
                    <button className="viewButton">View</button>
                  </Link>
                    <button className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</button>
                </div>
            )
        }
      }
    ];

const [rowSelectionModel, setRowSelectionModel] = useState([]);

const handleRowSelectionModelChange = (newSelectionModel) => {
  setRowSelectionModel(newSelectionModel);
}

const handleDeleteAll = async () => {
  try {
    if (rowSelectionModel.length === 0) {
      alert("Please select at least one enquiry.");
      return;
    }

    const response = await axios.delete("enquiry/delete/multiple", {
      data: { enquiryIDs: rowSelectionModel },
    });

    console.log(response.data); 
    setList(list.filter((enquiry) => !rowSelectionModel.includes(enquiry._id)));
    setRowSelectionModel([]); 
  } catch (error) {
    console.error("Error deleting enquiries:", error);
  }
};

const handleAssignTo = async () => {
  try {
    if (!selectedAdmin) {
      toast.info("Please select an admin.");
      return;
    }

    if (rowSelectionModel.length === 0) {
      toast.info("Please select at least one enquiry.");
      return;
    }

    const response = await axios.post('enquiry/assignEnquiries', {
      adminID: selectedAdmin, 
      enquiryIDs: rowSelectionModel 
    });

    toast.success("Enquiries assigned successfully!")
  } catch (error) {
    console.error('Error assigning enquiries:', error);
  }
};

  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        <p id="path">{path.toUpperCase()} RECORDS</p>
        {path === "packages" && 
        (
        <Link to={`/${path}/new`} style={{'textDecoration':'none', "marginRight":"20px", "color": "#28a745"}} className="link">
          Add new
        </Link>
        )}
      </div>
        <DataGrid
        className="dataGrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={row=>row._id}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        ref={dataGridRef}
      />
      {path === "enquiry" && 
          <div className="assignTo">
          <button onClick={handleAssignTo}>Assign To</button>
          <select className="adminDropdown" value={selectedAdmin} onChange={(e) => setSelectedAdmin(e.target.value)}>
              <option value="">Select Admin</option>
              {adminNames.map((adminName, index) => (
                <option key={index} value={adminName}>
                  {adminName}
                </option>
              ))}
            </select>
            <button className="DeleteAll" onClick={handleDeleteAll}>Delete All</button>
        </div>
        }
    </div>
  )
}

export default DataTable;