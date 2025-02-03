import { userLogin, userRegister, getUser, getUserById } from "../controller/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/", getUser)
router.get("/:id", getUserById)

export default router;

