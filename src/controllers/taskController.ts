import Task from "../models/Task.js";
import { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo } = req.body;

    const newTask = await Task.create({
      title,
      description,
      assignedTo: assignedTo || null,
    });

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (assignedTo) {
      res.status(200).json({
        message: `Task created and assigned to ${assignedTo}`,
        task: newTask,
      });
    }

    res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate(
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
