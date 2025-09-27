import { Document, model, Schema } from "mongoose";
import mongoose from "mongoose";

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

export const User = mongoose.model<IUser>("User", userSchema);
