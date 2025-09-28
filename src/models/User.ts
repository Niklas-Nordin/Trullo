import { Document, Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword: (candidate: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
