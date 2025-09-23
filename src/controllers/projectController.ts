import Project from "../models/Project.js";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const newProject = await Project.create({
      name,
      description,
    });

    if (!newProject) {
      return res.status(500).json({ message: "Failed to create project" });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Project name is required" });
    }

    if (!description || description.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Project description is required" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
