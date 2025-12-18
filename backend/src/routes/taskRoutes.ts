import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:projectId/tasks", authMiddleware, getAllTasks);
router.get("/:projectId/tasks/:id", authMiddleware, getTask);
router.post("/:projectId/tasks", authMiddleware, createTask);
router.put("/:projectId/tasks/:id", authMiddleware, updateTask);
router.delete("/:projectId/tasks/:id", authMiddleware, deleteTask);

export default router;
