import {createAccount} from "../CONTROLLER/Account.controller.js"
import express from "express";
const router = express.Router();
router.post("/accountInfo",createAccount);

export default router;