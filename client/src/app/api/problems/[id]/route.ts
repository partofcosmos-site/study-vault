import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { data: problem, error } = await supabase
      .from("problems")
      .select(
        `
                *,
                solutions (*)
            `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!problem)
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });

    return NextResponse.json(problem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
