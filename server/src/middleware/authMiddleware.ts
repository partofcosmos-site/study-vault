import { Request, Response, NextFunction } from "express";
import { supabase } from "../index";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Attach user to request (need to extend Request type ideally, but for now just pass it)
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
