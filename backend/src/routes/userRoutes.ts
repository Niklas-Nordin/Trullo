import express from "express";
import { signUp, getUser, getUsers, updateUser, deleteUser, signIn } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
