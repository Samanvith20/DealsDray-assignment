import { Router } from "express";
import RegisterUser from "../controllers/Registercontroller.js";
import LoginUser, { getUser, logoutUser } from "../controllers/Logincontoller.js";
import { upload } from "../middleware/Multer.js";
import {  employeeController, getEmployee, getEmployees, updateEmployee } from "../controllers/Employeecontroller.js";
import { deleteUser } from "../controllers/logoutcontroller.js";

const router=Router()
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout/:id").delete(logoutUser)
router.route("/getUser/:id").get(getUser)
router.route("/logout").delete(deleteUser)
router.route("/dashboard").post(upload.single("image"),employeeController)
router.route("/getEmployee").get(getEmployees)
router.route("/employee/:id").get(getEmployee)
router.put('/employees/:id', updateEmployee); 
router.delete('/employee/:id', deleteUser); 
export default router