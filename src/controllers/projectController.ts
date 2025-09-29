import { Types } from "mongoose";
import Project from "../models/Project.js";
import { Request, Response } from "express";
import { User } from "../models/User.js";

interface ProtectedRequest extends Request {
  user?: { id: string };
}

interface SetFields {
  title?: string;
  description?: string;
}

interface UpdateQuery {
  $set?: SetFields;
  $addToSet?: { members: string };
  $pull?: { members: string };
}

export const createProject = async (req: ProtectedRequest, res: Response) => {
  try {
    const { title, description, members } = req.body;
    const adminId = req.user?.id;
    const membersIds = members || [];

    const validatedMembers = membersIds.filter((id: string) => Types.ObjectId.isValid(id));

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(adminId && !validatedMembers.includes(adminId)) {
      validatedMembers.push(adminId);
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: "Project name is required" });
    }

    if (!description || description.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Project description is required" });
    }

    const newProject = await Project.create({
      title,
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

export const updateProject = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {title, description, addMemberId, removeMemberId } = req.body;
    const projectId = req.params.id;
    const setFields: SetFields = {};
    const updateQuery: UpdateQuery = {};
    const project = await Project.findById(projectId);

    if(!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    if(title !== undefined) {
      setFields.title = title;
    }

    if(description !== undefined) {
      setFields.description = description;
    }

    if(Object.keys(setFields).length > 0) {
      updateQuery.$set = setFields;
    }

    if(addMemberId) {
      if(!Types.ObjectId.isValid(addMemberId)) {
        return res.status(400).json({ message: "Invalid member ID" });
      }

      const userExists = await User.findById(addMemberId);
      if(!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if(addMemberId === userId) {
        return res.status(400).json({ message: "Admin is already a member" });
      }
      
      if (project?.members.map(m => m.toString()).includes(addMemberId)) {
        return res.status(400).json({ message: "User is already a member" });
      }
      
      updateQuery.$addToSet = { members: addMemberId };
    }

    if(removeMemberId) {
      if(!Types.ObjectId.isValid(removeMemberId)) {
        return res.status(400).json({ message: "Invalid member ID" });
      }
      updateQuery.$pull = { members: removeMemberId };

      if (removeMemberId === userId) {
        return res.status(400).json({ message: "Admin cannot be removed" });
      }
    }

    if (!updateQuery.$set && !updateQuery.$addToSet && !updateQuery.$pull) {
      return res.status(400).json({ message: "No valid update fields provided" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateQuery,
      { new: true, runValidators: true }
    )
    .populate("admin", "-password")
    .populate("members", "-password")
    .populate("tasks");

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (updatedProject.admin.id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ message: "Project updated", project: updatedProject });
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProject = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.admin.toString() !== userId) {
      return res.status(403).json({ message: "Only creator of this project can delete" });
    }

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
