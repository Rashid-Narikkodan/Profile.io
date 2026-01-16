import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { LoginInputs, RegisterInput } from "../types/user";

export const registerController = async (req: Request, res: Response) => {
  try {
    const input: RegisterInput = req.body;

    const { user, accessToken, refreshToken } = await registerUser(input);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (err: any) {
    console.error("Register error:", err);

    if (err.message.includes("Email already registered")) {
      return res.status(400).json({ success: false, message: err.message });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const input: LoginInputs = req.body;

    const { user } = await loginUser(input);

    return res.status(201).json({
      success: true,
      message: "User loggedin successfully",
      data: {
        user,
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (err: any) {
    console.error("Register error:", err);

    if (err.message.includes("Email already registered")) {
      return res.status(400).json({ success: false, message: err.message });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
};