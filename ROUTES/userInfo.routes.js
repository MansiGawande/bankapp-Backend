import express  from "express";
import {createAccount ,updateUser,perticulerUser} from "../CONTROLLER/userInfo.controller.js"
const router = express.Router();
router.post("/createAccount",createAccount);
router.get("/perticulerUser",perticulerUser);
router.put("/updateUser",updateUser)
export default router;