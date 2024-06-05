import express from "express"
import Package from "../models/Package.js";
import { countByType, countPackages, createPackage, deletePackage, getAllUniqueDestinations, getMainPackages, getPackage, getPackages, getallPackages, updatePackage } from "../controllers/packagecontroller.js";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createPackage);

//UPDATE
router.put("/:id",verifyAdmin, updatePackage);

//DELETE
router.delete("/:id",verifyAdmin, deletePackage);

//GET
router.get("/:id", getPackage);

//GETALLSEARCHWALA_ limit, min, max
router.get("/get/all", getPackages);

//router.get("/countByCity", countByCity);
router.get("/get/countByType", countByType);

//GETMAINPACKAGES
router.get("/get/main", getMainPackages)

//GETALL
router.get("/",getallPackages)

//GET ALL DESTINATION NAMES
router.get("/get/destinations", getAllUniqueDestinations);

//GET PACKAGE COUNT
router.get('/doc/count', countPackages);

export  default router;