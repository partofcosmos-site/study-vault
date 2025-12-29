import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

import problemsRouter from "./routes/problemsRoutes";
import authRouter from "./routes/authRoutes";
import srRouter from "./routes/srRoutes";

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/sr", srRouter);
app.use("/api/problems", problemsRouter);

// Basic Route
app.get("/", (req: Request, res: Response) => {
  res.send("StudyVault API is running");
});

// Health Check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
