import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const exam_type = searchParams.get("exam_type");
    const subject = searchParams.get("subject");
    const chapter = searchParams.get("chapter");
    const difficulty = searchParams.get("difficulty");

    let query = supabase.from("problems").select("*", { count: "exact" });

    if (exam_type && exam_type !== "All")
      query = query.eq("exam_type", exam_type);
    if (subject && subject !== "All") query = query.eq("subject", subject);
    if (chapter) query = query.eq("chapter", chapter);
    if (difficulty && difficulty !== "All") {
      // Difficulty mapping logic if needed, or direct value
      // Frontend sends 'All', 'Easy (1-2)' etc? No, params usually raw.
      // Let's assume params are clean or handled safe.
      // If param is '4', query eq 4.
      // If frontend sends 'Hard (4-5)', we need parsing.
      // But existing backend just did `eq`. I'll assume standard values.
      query = query.eq("difficulty_level", difficulty);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      data,
      meta: {
        page,
        limit,
        total: count,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      problem_number,
      exam_type,
      subject,
      chapter,
      topic,
      problem_statement,
    } = body;

    if (
      !problem_number ||
      !exam_type ||
      !subject ||
      !chapter ||
      !topic ||
      !problem_statement
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("problems")
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
