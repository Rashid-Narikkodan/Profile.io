export interface JwtPayload {
  sub: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
}
