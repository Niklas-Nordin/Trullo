import { createProject } from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/create", authMiddleware, createProject);

export default router;
