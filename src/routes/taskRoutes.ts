import { Router } from "express";
import {
  createTask,
  getTask,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/create", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);

export default router;
