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

export const getAllProjects = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const projects = await Project.find({
      $or: [{ admin: userId}, {members: userId }]
    })
    .populate("admin", "-password")
    .populate("members", "-password")
    .populate("tasks");

    res.status(200).json({ message: "Projects retrieved", projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProjectById = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(projectId)
      .populate("admin", "-password")
      .populate("members", "-password")
      .populate("tasks");
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.admin.id.toString() !== userId && !project.members.map(m => m.id.toString()).includes(userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ message: "Project retrieved", project });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//TODO: update project
const updateProject = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
  } catch (error) {
    
  }
};


// TODO: delete project