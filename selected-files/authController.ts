import { Request, Response } from "express";
import { supabase } from "../index";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // 1. Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) return res.status(400).json({ error: error.message });

    // 2. Create profile entry if needed (trigger can handle this, but explicit here if no trigger)
    // Assuming backend trigger handles profile creation from auth.users or client side handles it.
    // We'll return the auth data.

    res
      .status(201)
      .json({ message: "User created successfully", user: data.user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ error: error.message });

    res.json({ session: data.session, user: data.user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user; // Set by middleware
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    // Fetch profile details from public schema (if we have a 'profiles' table)
    // Or just return user metadata
    const { data: profile, error } = await supabase
      .from("profiles") // Assuming profiles table exists
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is Row not found
      // If profile missing, return basic user info
      return res.json({
        id: user.id,
        email: user.email,
        ...user.user_metadata,
      });
    }

    res.json(profile || user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
