import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

router.get("/", authMiddleware, getAllProjects);
router.post("/create", authMiddleware, createProject);

router.get("/:id", authMiddleware, getProjectById);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
