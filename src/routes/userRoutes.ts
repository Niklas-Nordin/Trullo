import express from "express";
import { createUser, getUser, getUsers, updateUser, deleteUser, signIn } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/register", createUser);
router.post("/login", signIn);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;