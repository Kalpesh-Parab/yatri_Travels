
import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  const {
    userID,
    userName,
    phoneNo,
    emailID,
    packageID,
    destinationName,
    packageType,
    price,
    options,
    query,
    date,
    days,
  } = req.body;

  try {
    const newEnquiry = new Enquiry({
      userID,
      userName,
      phoneNo,
      emailID,
      packageID,
      destinationName,
      packageType,
      price,
      options,
      query,
      date, 
      days, 
    });


    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({ message: "Enquiry created successfully", enquiry: savedEnquiry });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const assignEnquiries = async (req, res, next) => {
  const { adminID, enquiryIDs } = req.body;

  try {
    
    await Enquiry.updateMany(
      { _id: { $in: enquiryIDs } },
      { assignedTo: adminID }
    );

    
    res.status(200).json({ success: true, message: "Enquiries assigned successfully" });
  } catch (error) {
    console.error("Error assigning enquiries:", error);
    res.status(500).json({ success: false, message: "Failed to assign enquiries" });
  }
};


//GET ALL
export const getallEnquires = async (req, res, next) => {
  try {
      const allenquiries = await Enquiry.find();
      res.status(200).json(allenquiries);
    } catch (err) {
  next(err);
}
};

//GET ENQUIRY COUNT
export const countEnquiries = async (req, res, next) => {
  try {
      const totalCount = await Enquiry.countDocuments();
      res.status(200).json({ totalCount });
  } catch (err) {
      next(err);
  }
};

//Delete Enquiry
export const deleteEnquiry = async (req, res, next) =>{

  try {
      const deleteEnquiry = await Enquiry.findByIdAndDelete(req.params.id)
      res.status(200).json("Enquiry has been deleted")
  } catch (error) {
      next(error)
  }
};

//Get Single Enquiry
export const getEnquiry = async (req, res, next) =>{

  try {
      const enquiry = await Enquiry.findById(req.params.id)
      res.status(200).json(enquiry)
  } catch (error) {
      next(error)
  }
}

// Controller to delete multiple enquiries using the same logic as getEnquiry
export const deleteMultipleEnquiries = async (req, res, next) => {
  try {
    const { enquiryIDs } = req.body; 
    const deletedEnquiries = await Promise.all(
      enquiryIDs.map(async (enquiryID) => {
        return await Enquiry.findByIdAndDelete(enquiryID);
      })
    );

    const filteredDeletedEnquiries = deletedEnquiries.filter((enquiry) => enquiry !== null);

    if (filteredDeletedEnquiries.length === 0) {
      return res.status(404).json({ message: "No enquiries found with the provided IDs" });
    }

    res.status(200).json(filteredDeletedEnquiries);
  } catch (error) {
    next(error); 
  }
};


// Update Enquiry Status and handled by
export const updateEnquiryStatus = async (req, res, next) => {
  const { status, handledByName } = req.body;
  const { id } = req.params;

  try {

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.status = status;
    enquiry.handledByName = handledByName;

    const updatedEnquiry = await enquiry.save();

    res.status(200).json({ message: "Enquiry status updated successfully", enquiry: updatedEnquiry });
  } catch (error) {
    console.error("Error updating enquiry status:", error);
    next(error);
  }
};


// Count Enquiries by Status
export const countEnquiriesByStatus = async (req, res, next) => {
  const { status } = req.params;

  try {
    const enquiryCounts = await Enquiry.aggregate([
      { $match: { status: status } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    let count = 0;
    if (enquiryCounts.length > 0) {
      count = enquiryCounts[0].count;
    }

    res.status(200).json({ status: status, count: count });
  } catch (error) {
    console.error("Error counting enquiries by status:", error);
    next(error);
  }
};

// Get Enquiries by Status
export const getEnquiriesByStatus = async (req, res, next) => {
  const { status } = req.params;

  try {
    const enquiries = await Enquiry.find({ status });

    res.status(200).json({ enquiries });
  } catch (error) {
    console.error("Error fetching enquiries by status:", error);
    next(error);
  }
};

// GET ENQUIRIES BY USER_ID
export const getEnquiriesByUserID = async (req, res) => {
  const { userID } = req.params;

  try {
    const enquiries = await Enquiry.find({ userID });

    res.status(200).json({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries by user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Get enquiries assigned to an Admin
export const getAssignedEnquiries = async(req, res, next) => {
  try {
    const enquiries = await Enquiry.find({assignedTo: {$ne: null}}).populate("assignedTo");
    res.status(200).json(enquiries);
  } catch (error) {
    next(error)
  }
}


// Controller to get enquiries by admin name
export const getEnquiriesByAdminName = async (req, res) => {
  const { admin_name } = req.params;

  try {
    const enquiryIDs = await Enquiry.find({ assignedTo: admin_name }).distinct('_id');
    const enquiries = await Enquiry.find({ _id: { $in: enquiryIDs } });

    res.status(200).json({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries by admin name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to update remarks for an enquiry
export const updateEnquiryRemarks = async (req, res, next) => {
  try {
    const enquiryId = req.params.id;
    const { remarks } = req.body; 

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { remarks }, 
      { new: true } 
    );

   
    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

   
    res.status(200).json(updatedEnquiry);
  } catch (error) {
    next(error); 
  }
};