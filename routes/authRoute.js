<<<<<<< HEAD
import { userLogin, userRegister, getUser, getUserById } from "../controller/userController.js";
=======
import { userLogin, userRegister, getUser, getUserById, logoutUser } from "../controller/userController.js";
>>>>>>> origin/VOL-3/auth-controller
import express from "express";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/", getUser)
router.get("/:id", getUserById)
<<<<<<< HEAD
=======
router.delete('/logout', logoutUser)
>>>>>>> origin/VOL-3/auth-controller

export default router;

