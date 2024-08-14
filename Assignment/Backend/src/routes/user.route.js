import { Router } from "express";
import RegisterUser from "../controllers/Registercontroller.js";
import LoginUser from "../controllers/Logincontoller.js";
import { upload } from "../middleware/Multer.js";
import { deleteEmployee, employeeController, getEmployees, updateEmployee } from "../controllers/Employeecontroller.js";

const router=Router()
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/dashboard").post(upload.single("image"),employeeController)
router.route("/getEmployee").get(getEmployees)
router.put('/employees/:id', updateEmployee); // Update employee
router.delete('/employees/:id', deleteEmployee); // Delete employee
export default router