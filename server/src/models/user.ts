import mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 80,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,            // prevents duplicate accounts
      lowercase: true,
      trim: true,
      index: true             // fast login lookup
    },

    passwordHash: {
      type: String,
      required: true,
      select: false           // NEVER returned in queries
    },

    phone: {
      type: String,
      trim: true
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active"
    },

    lastLoginAt: {
      type: Date
    },

    refreshToken: {
      type: String,
      select: false           // prevent token leakage
    }
  },
  {
    timestamps: true         // createdAt, updatedAt
  }
);

export default mongoose.model<IUser>("User", userSchema);
