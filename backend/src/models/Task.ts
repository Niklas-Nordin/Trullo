import { Document, model, Types, Schema } from "mongoose";

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: "to-do" | "in progress" | "blocked" | "done";
  assignedTo: Types.ObjectId | null;
  project: Types.ObjectId;
  createdAt: Date;
  finishedAt: Date | null;
  finishedBy: Types.ObjectId | null;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) => v.trim().length > 0,
      message: "Title cannot be empty",
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) => v.trim().length > 0,
      message: "Description cannot be empty",
    },
  },
  status: {
    type: String,
    enum: ["to-do", "in progress", "blocked", "done"],
    default: "to-do",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
    default: null,
  },
  finishedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }
});

export default model<ITask>("Task", taskSchema);
