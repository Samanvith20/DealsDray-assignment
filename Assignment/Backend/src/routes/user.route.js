import { Router } from "express";
import RegisterUser from "../controllers/Registercontroller.js";
import LoginUser from "../controllers/Logincontoller.js";
import { upload } from "../middleware/Multer.js";
import { employeeController, getEmployees } from "../controllers/Employeecontroller.js";

const router=Router()
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/dashboard").post(upload.single("image"),employeeController)
router.route("/getEmployee").get(getEmployees)
export default router