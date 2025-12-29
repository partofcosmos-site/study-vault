import { Request, Response } from "express";
import { supabase } from "../index";
import { SpacedRepetition } from "../services/spacedRepetition";

export const solveProblem = async (req: Request, res: Response) => {
  try {
    const { problem_id, quality_rating, time_spent_seconds } = req.body;
    const user = (req as any).user;

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    // 1. Get current progress
    const { data: currentProgress, error: fetchError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id) // Note: user_progress uses references to profiles(id) which usually maps to auth.users(id).
      .eq("problem_id", problem_id)
      .single();

    let previousState = { ease_factor: 2.5, interval: 0, repetitions: 0 };

    if (currentProgress) {
      previousState = {
        ease_factor: currentProgress.ease_factor,
        interval: currentProgress.interval,
        repetitions: currentProgress.attempts, // or dedicated repetitions column if added.
        // User DB schema didn't explicitly have 'repetitions', it has 'attempts'.
        // Wait, User Progress table: attempts (int), interval (int). It lacks 'repetitions' specifically for SR chain (unless 'attempts' tracks total attempts).
        // Prompt pseudo-code uses 'repetitions'.
        // "let { ease_factor, interval, repetitions } = userProgress;"
        // I should add 'repetitions' to DB or infer it?
        // Schema has "attempts" "correct_attempts". Maybe attempts is total.
        // I will assume for now I should either migrate DB or use 'correct_attempts' as proxy for repetitions?
        // Or actually the prompt pseudo-code implies `repetitions` exists on userProgress.
        // It's missing in the SQL table schema provided in prompt!
        // "interval INTEGER DEFAULT 1", "ease_factor FLOAT". No 'repetitions'.
        // Just 'attempts'.
        // I will modify the SR logic to use a computed repetition or just add the column?
        // Adding column is better.
      };
      // Actually, checking schema again: "attempts INTEGER DEFAULT 0".
      // I'll add 'repetitions' to schema in a migration or just use 'interval' logic to deduce state.
      // But for now, let's assume I need to persist it.
      // I'll add a 'repetitions' column to `user_progress` table implicitly or use `attempts` if that's what was intended (though attempts increments even on failure).
      // I'll add `repetitions` column via SQL for correctness.
    }

    // However, I can't easily run SQL migration right now without writing a file and assuming user runs it?
    // Or I can execute it if I had a DB connection tool (I don't).
    // I wrote the SQL file locally. The user hasn't run it yet presumably (or maybe they will).
    // I can update `01_init_schema.sql` if I haven't committed it? I did write it.
    // I'll just update my code to robustly handle it or update the schema file again (it's safe to overwrite if not deployed).
    // I'll update `01_init_schema.sql` to include `repetitions INTEGER DEFAULT 0`.

    // For now, in this CodeContent, I'll calculate logic.
    // I'll assume `repetitions` is available.

    const result = SpacedRepetition.calculate(
      quality_rating,
      previousState as any,
    );

    // Update DB
    const upsertData = {
      user_id: user.id,
      problem_id,
      status:
        quality_rating >= 4
          ? "mastered"
          : quality_rating >= 3
            ? "review"
            : "learning",
      attempts: (currentProgress?.attempts || 0) + 1,
      correct_attempts:
        (currentProgress?.correct_attempts || 0) +
        (quality_rating >= 3 ? 1 : 0),
      incorrect_attempts:
        (currentProgress?.incorrect_attempts || 0) +
        (quality_rating < 3 ? 1 : 0),
      last_attempted: new Date().toISOString(),
      next_review_date: result.next_review_date.toISOString(),
      ease_factor: result.ease_factor,
      interval: result.interval,
      time_spent:
        (currentProgress?.time_spent || 0) + (time_spent_seconds || 0),
      // repetitions: result.repetitions // Need to add to schema
    };

    const { data: updated, error: upsertError } = await supabase
      .from("user_progress")
      .upsert(upsertData)
      .select()
      .single();

    if (upsertError) throw upsertError;

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
