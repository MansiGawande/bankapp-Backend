import express from "express";
import {statementview, transactionOp} from "../CONTROLLER/Transaction.controller.js"
const router = express.Router();
router.post("/transaction",transactionOp);
router.get("/statementview",statementview)
export default router;