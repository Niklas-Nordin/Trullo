import Task, {ITask} from "../models/Task.js";
import { Request, Response } from "express";
import Project, { IProject } from "../models/Project.js";

interface ProtectedRequest extends Request {
  user?: { id: string };
}

export const createTask = async (req: ProtectedRequest, res: Response) => {
  try {
    const { title, description, assignedTo } = req.body;
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId) as IProject | null;

    console.log(projectId)
    console.log(project)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.map(m => m.toString()).includes(userId)) {
      return res.status(403).json({ message: "Forbidden: Not a member of the project" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const newTask: ITask = await Task.create({
      title,
      description,
      assignedTo: assignedTo || null,
      project: projectId,
    });

    project.tasks.push(newTask._id);
    await project.save();

    const message = assignedTo ? `Task created and assigned to ${assignedTo}` : "Task created without assignment";

    res.status(201).json({ message, task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllTasks = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.projectId;

    if(!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId)

    if(!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.map(m => m.toString()).includes(userId) && project.admin.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: Not a member of the project" });
    }

    const tasks = await Task.find({ project: projectId }).populate("assignedTo", "-password");

    res.status(200).json({ message: "Tasks retrieved", tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTask = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const projectId = req.params.projectId;
    const taskId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const project = await Project.findById(projectId)

    if(!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.map(m => m.toString()).includes(userId) && project.admin.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden: Not a member of the project" });
    }

    const task = await Task.findById({ _id: taskId, project: projectId }).populate(
      "assignedTo",
      "-password"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res
      .status(200)
      .json({ message: "Task successfully retrieved", task: task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
