import express from "express";
import { regsiter } from "../CONTROLLERS/auth.controller";
import { login } from "../CONTROLLERS/auth.controller";
import { logout } from "../CONTROLLERS/auth.controller";
import { getprofle } from "../CONTROLLERS/auth.controller";
import verifytoken from "../MIDDLEWARES/auth.middleware.js";

const router = express.Router();

//auth routes
router.post("/register", regsiter);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifytoken, getprofle);

export default router;
