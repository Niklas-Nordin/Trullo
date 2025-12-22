import { User } from "../models/User.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "console";

interface ProtectedRequest extends Request {
  user?: { id: string };
}

dotenv.config();

const SALT_ROUNDS = 10;

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const errors: Record<string, string> = {};

    const existingEmail = await User.findOne({ email });

    if (!email) errors.email = "Email is required";
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    if (existingEmail) {
      errors.email = "Email already in use";
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      errors.username = "Username already in use";
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again later.", error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!password || !identifier) {
      return res.status(400).json({ message: "Login credentials required" });
    }

    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    console.log("user", user);
    console.log("identifier", identifier);

    if (!user) {
      return res.status(400).json({ message: "Invalid login credentials 1" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    console.log("matchPassword", matchPassword);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid login credentials 2" });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 3600000,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
    });

    res.status(200).json({ message: "Login successful", token: token, user: {
      id: user._id,
      username: user.username,
      email: user.email
    } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUsers = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!targetUserId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.id;
    const { username, email, password } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (userId !== targetUserId) {
      return res.status(403).json({ message: "Forbidden: You can only update your own account" });
    }
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username !== user.username) {
      return res.status(400).json({ message: "Username cannot be changed" });
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
      }
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    await user.save();

    res.status(200).json({ message: "User updated", user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const targetUserId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (userId !== targetUserId) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own account" });
    }

    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
