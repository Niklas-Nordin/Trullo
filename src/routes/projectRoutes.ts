import { createProject, getAllProjects, getProjectById } from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

router.get("/", authMiddleware, getAllProjects);
router.post("/create", authMiddleware, createProject);
router.get("/:id", authMiddleware, getProjectById);

export default router;
