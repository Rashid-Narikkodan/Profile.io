import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.route"
// import userRoutes from "./routes/user.routes";
// import adminRoutes from "./routes/admin.routes";

const app = express();

/* -------------------- SECURITY -------------------- */
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173", // React URL
    credentials: true               // allow cookies (refresh token)
  })
);

// Rate limit to block brute force
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);


/* -------------------- REQUEST PARSING -------------------- */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));


/* -------------------- LOGGING -------------------- */
app.use(morgan("dev"));


/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
// app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);


/* -------------------- HEALTH CHECK -------------------- */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


/* -------------------- ERROR HANDLER -------------------- */
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
