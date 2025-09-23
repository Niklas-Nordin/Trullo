import { createProject } from "../controllers/projectController.js";
import { Router } from "express";

const router = Router();

router.post("/create", createProject);

export default router;
