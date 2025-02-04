import { userLogin, userRegister, getUser, getUserById, logoutUser } from "../controller/userController.js";
import express from "express";
import {protectedMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/", protectedMiddleware, getUser)
router.delete("/logout", protectedMiddleware, logoutUser)

export default router;

