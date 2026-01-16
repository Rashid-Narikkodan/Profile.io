import jwt from "jsonwebtoken";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "7d";
const ISSUER = "your-app";
const AUDIENCE = "your-app-users";

export const signAccessToken = (
  userId: string,
  role: string
) => {
  return jwt.sign(
    {
      sub: userId,
      role,
      type: "access"
    },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: ACCESS_TOKEN_TTL,
      issuer: ISSUER,
      audience: AUDIENCE
    }
  );
};

export const signRefreshToken = (
  userId: string,
  tokenVersion: number
) => {
  return jwt.sign(
    {
      sub: userId,
      type: "refresh",
      tokenVersion
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: REFRESH_TOKEN_TTL,
      issuer: ISSUER,
      audience: AUDIENCE
    }
  );
};
