import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./adminProfiles.scss";

const AdminProfiles = () => {
  const [adminProfiles, setAdminProfiles] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchAdminProfiles = async () => {
      try {
        const response = await axios.get("/users/admins");
        if (response.status === 200) {
          const enrichedAdminProfiles = response.data.map((profile, index) => ({
            id: index + 1,
            ...profile,
          }));
          setAdminProfiles(enrichedAdminProfiles);
        }
      } catch (error) {
        console.error("Failed to fetch admin profiles:", error);
      }
    };

    fetchAdminProfiles();
  }, []);

  const columns = [
   
    {
      field: "username",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row._id)}>
              View
            </div>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const handleView = (id) => {
    // Navigate to the View Enquiry page with the specific enquiryId
    navigate(`/users/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      // Refresh enquiries list after deletion
      setAdminProfiles(adminProfiles.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="adminProfilesContainer">
      
      
        <div className="dataGridContainer">
          <Datatable columns={columns} adminProfiles={adminProfiles} />
        </div>
      
    </div>
  );
};

const Datatable = ({ columns, adminProfiles }) => {
  return (
    <div className="datatable">
      <div className="datatableTitle">Admin Profiles</div>
      <DataGrid
        rows={adminProfiles}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection={false}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default AdminProfiles;