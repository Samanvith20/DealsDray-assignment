import { Router } from "express";
import RegisterUser from "../controllers/Registercontroller.js";
import LoginUser from "../controllers/Logincontoller.js";

const router=Router()
router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
export default router