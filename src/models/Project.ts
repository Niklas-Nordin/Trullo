import { Schema, model, Types } from "mongoose";

interface IProject {
  name: string;
  description: string;
  admin: Types.ObjectId;
  members: Types.ObjectId[];
  tasks: Types.ObjectId[];
  createdAt: Date;
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) => v.trim().length > 0,
      message: "Project name cannot be empty",
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v: string) => v.trim().length > 0,
      message: "Project description cannot be empty",
    },
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.index({ name: 1, admin: 1 }, { unique: true });

export default model<IProject>("Project", projectSchema);
