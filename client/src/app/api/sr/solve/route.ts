import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SpacedRepetition } from "@/lib/spacedRepetition";

export async function POST(request: Request) {
  try {
    // Auth Check
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 },
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Logic
    const body = await request.json();
    const { problem_id, quality_rating, time_spent_seconds } = body;

    // 1. Get current progress
    const { data: currentProgress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("problem_id", problem_id)
      .single();

    let previousState = { ease_factor: 2.5, interval: 0, repetitions: 0 };

    if (currentProgress) {
      previousState = {
        ease_factor: currentProgress.ease_factor,
        interval: currentProgress.interval,
        repetitions: currentProgress.attempts, // Assuming attempts aligns with reps for now
      };
    }

    const result = SpacedRepetition.calculate(quality_rating, previousState);

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
    };

    const { data: updated, error: upsertError } = await supabase
      .from("user_progress")
      .upsert(upsertData)
      .select()
      .single();

    if (upsertError) throw upsertError;

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
