import "./statusdataTable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnquiryStatusTable = ({columns, status }) => {
    const [enquiries, setEnquiries] = useState([]);
    const [adminNames, setAdminNames] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState("");
    const dataGridRef = useRef(null);
    const navigate = useNavigate();
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
   
    const handleRowSelectionModelChange = (newSelectionModel) => {
        setRowSelectionModel(newSelectionModel);
    } 

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get(`/enquiry/status/${status}`);
                setEnquiries(response.data.enquiries);
            } catch (error) {
                console.error("Error fetching enquiries:", error);
            }
        };

        fetchEnquiries();
    }, [status]);

    useEffect(() => {
        const fetchAdminNames = async () => {
            try {
                const response = await axios.get("/users/doc/admins");
                setAdminNames(response.data);
            } catch (error) {
                console.error("Error fetching admin names:", error);
            }
        };

        fetchAdminNames();
    }, []);

    const handleAssignTo = async () => {
        try {
            if (!selectedAdmin) {
                alert("Please select an admin.");
                return;
            }

            if (rowSelectionModel.length === 0) {
                alert("Please select at least one enquiry.");
                return;
            }

            const response = await axios.post("enquiry/assignEnquiries", {
                adminID: selectedAdmin,
                enquiryIDs: rowSelectionModel,
            });

            console.log(response.data);
        } catch (error) {
            console.error("Error assigning enquiries:", error);
        }
    };

    const handleStatusClick = (enquiryID) => {
        navigate(`/enquiry/${enquiryID}`);
    };

    const modifiedColumns = columns.map((column) => {
        if (column.field === 'status') {
            return {
                ...column,
                renderCell: (params) => (
                    <div 
                        className={`status ${params.value?.toLowerCase()}`} 
                        onClick={() => handleStatusClick(params.row._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {params.value}
                    </div>
                ),
            };
        }
        return column;
    });

    return (
        <div className="statusDataTable">
            <DataGrid
                className="dataGrid_"
                rows={enquiries}
                columns={modifiedColumns}
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

            <div className="assignTo_">
                <button onClick={handleAssignTo}>Assign To</button>
                <select
                    className="adminDropdown_"
                    value={selectedAdmin}
                    onChange={(e) => setSelectedAdmin(e.target.value)}
                >
                    <option value="">Select Admin</option>
                    {adminNames.map((adminName, index) => (
                        <option key={index} value={adminName}>
                            {adminName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default EnquiryStatusTable;
