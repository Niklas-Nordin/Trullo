import { Document, Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

interface IUser extends Document {
    username: string;
    firstName:  string;
    lastName: string;
    email: string;
    password: string;
    comparePassword: (candidate: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        set: (name: string) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        set: (name: string) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
