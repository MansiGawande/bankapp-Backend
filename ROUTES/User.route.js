import express from "express";
import { signUp, signIn } from "../CONTROLLER/user.controller.js";
import { body } from "express-validator";

const router = express.Router();
router.post(
  "/SignUp",
  [
    body("name").notEmpty().withMessage("Name is required..")
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters long'),
    body("email")
      .isEmail()
      .withMessage("please enter a valid email"),
    //   .isEmpty()
    //   .withMessage("Email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isAlphanumeric()
      .withMessage("password should alphanumeric")
      .isLength({ min: 8 })
      .withMessage("Password must be longer than 6 characters."),
  ],
  signUp
);
router.post("/signIn", signIn);

export default router;
