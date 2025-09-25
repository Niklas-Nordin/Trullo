import { Types } from "mongoose";
import Project from "../models/Project.js";
import { Request, Response } from "express";

interface ProtectedRequest extends Request {
  user?: { id: string };
}

export const createProject = async (req: ProtectedRequest, res: Response) => {
  try {
    const { name, description, members } = req.body;
    const adminId = req.user?.id;
    const membersIds = members || [];

    const validatedMembers = membersIds.filter((id: string) => Types.ObjectId.isValid(id));

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(adminId && !validatedMembers.includes(adminId)) {
      validatedMembers.push(adminId);
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Project name is required" });
    }

    if (!description || description.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Project description is required" });
    }

    const newProject = await Project.create({
      name,
      description,
      admin: adminId,
      members: validatedMembers,
    });

    res.status(201).json({ message: "Project created", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
