// enquiryRoutes.js
import express from 'express';
import { countEnquiries, createEnquiry, deleteEnquiry, getEnquiry, getallEnquires, countEnquiriesByStatus, getEnquiriesByStatus, getEnquiriesByUserID, getAssignedEnquiries, assignEnquiries, updateEnquiryStatus, getEnquiriesByAdminName, updateEnquiryRemarks, deleteMultipleEnquiries } from '../controllers/enquiryController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Route to handle the creation of an enquiry
router.post('/create', createEnquiry);

//Assign enquiry to Admin
router.post("/assignEnquiries", verifyAdmin, assignEnquiries)

//GETALL
router.get("/", getallEnquires);

//COUNT ENQUIRIES
router.get("/doc/count", countEnquiries);

// Count Enquiries by Status
router.get("/count/:status", countEnquiriesByStatus);

//GET ENQUIRIES BY STATUS
router.get("/status/:status", getEnquiriesByStatus);

//DELETE ENQUIRY
router.delete("/:id", deleteEnquiry);

//GET ENQUIRY
router.get("/:id", getEnquiry);

//GET ENQUIRY BY USER_ID
router.get('/user/:userID', getEnquiriesByUserID);

// Update Enquiry Status
router.put("/update/:id", updateEnquiryStatus);

//Get all assigned enquiries
router.get("/assigned", verifyAdmin, getAssignedEnquiries);

// Get enquiries by admin name
router.get("/get/:admin_name", getEnquiriesByAdminName);

// Update Enquiry Status
router.put("/remark/:id", updateEnquiryRemarks);

// DELETE MULTIPLE ENQUIRIES
router.delete("/delete/multiple", deleteMultipleEnquiries)

export default router;
