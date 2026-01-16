
export type PublicUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "user";
  status: "active" | "suspended";
  lastLoginAt?: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};
export type LoginInputs = {
  email: string;
  password: string;
};
