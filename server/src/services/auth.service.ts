import bcrypt from "bcryptjs";
import UserModel from "../models/user";
import { RegisterInput, LoginInputs, PublicUser } from "../types/user";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

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
  
  const accessToken= signAccessToken(userDoc._id.toString(),userDoc.role);
  const refreshToken= signRefreshToken(userDoc._id.toString(),1);
  console.log(accessToken, refreshToken)
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
export const loginUser=(data:LoginInputs)=>{

}