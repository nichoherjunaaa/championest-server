import { userLogin, userRegister, getUser, getUserById, logoutUser } from "../controller/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/", getUser)
router.get("/:id", getUserById)
router.delete('/logout', logoutUser)

export default router;

