import express from "express"
import { deleteUser, getAdminDetails, getAdminProfiles, getAdminUsernames, getUser, getUserByPhone, getUserCount, getUsers, resetPassword, updateUser } from "../controllers/usercontroller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get('/admins', getAdminProfiles);

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id", getUser);



//GETALL
router.get("/",verifyAdmin, getUsers);



//GET BY PHONE NUMBER.
router.get("/phone/:phone", getUserByPhone);

//RESETTING PASSWORD
router.post('/reset-password', resetPassword);

//GET USER COUNT
router.get('/doc/count', getUserCount);

//GET USER COUNT
router.get('/doc/admins', getAdminUsernames);

//GET USER COUNT
router.get('/doc/admindetails', getAdminDetails);

export  default router;