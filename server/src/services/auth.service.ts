import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { RegisterInput, PublicUser } from "../types/user";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "15m";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const REFRESH_EXPIRES_IN = "7d";

const createTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  return { accessToken, refreshToken };
};

// Registration Service
export const registerUser = async (input: RegisterInput): Promise<{
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}> => {
  const { name, email, password, phone } = input;

  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(password, 12);

  const userDoc = await UserModel.create({
    name,
    email,
    passwordHash,
    phone,
    role: "user",          // enforce role
    status: "active"
  });

  const { accessToken, refreshToken } = createTokens(userDoc._id.toString());

  userDoc.refreshToken = refreshToken;
  await userDoc.save();

  const user: PublicUser = {
    _id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    phone: userDoc.phone,
    role: userDoc.role,
    status: userDoc.status,
    lastLoginAt: userDoc.lastLoginAt,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt
  };

  return { user, accessToken, refreshToken };
};
