export const userColumns = [
    { field: '_id', headerName: 'ID', width: 230 },
    {
        field: "user", 
        headerName: "User",
        width: 150,
        renderCell: (params) => {
            return(
                <div className="cellWithImg">
                    { params.row.username }
                </div>
            )
        }
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "phone",
        headerName:"Phone",
        width: 150,
    }
   
    
];

export const packageColumns = [
    { field: '_id', headerName: 'ID', width: 230 },
    {
        field: "title",
        headerName: "Title",
        width: 230,
    },
    {
        field: "destinationName",
        headerName: "Place",
        width: 120,
    },
    {
        field: "duration",
        headerName: "Duration",
        width: 120,
    },
    {
        field: "packageType",
        headerName: "Type",
        width: 130,
    },
    {
        field: "price",
        headerName: "Price",
        width: 100,
    },
];

export const enquiryColumns = [
   
    {
        field: "userName",
        headerName: "Full Name",
        width: 120,
    },
    {
        field: "phoneNo",
        headerName:"Phone",
        width: 150,
    },
    {
        field: "emailID",
        headerName: "Email",
        width: 200,
    },
    {
        field: "date",
        headerName: "Dates",
        width: 150,
    },
    {
        field: "destinationName",
        headerName: "Destination",
        width: 120,
    },
    {
        field: 'handledByName',
        headerName: 'Handled By',
        width: 120,
        valueGetter: (params) => params?.row?.handledByName || "Not Handled!"
    },
    {
        field: "status",
        headerName: "Status",
        width: 100,
        renderCell: (params) => {
          return(
            <div className={`status ${params.value?.toLowerCase()}`}>
              {params.value}
            </div>
          )
        }
      },   
];