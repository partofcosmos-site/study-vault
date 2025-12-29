import { Request, Response } from "express";
import { supabase } from "../index";

export const getAllProblems = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      exam_type,
      subject,
      chapter,
      difficulty,
    } = req.query;

    let query = supabase.from("problems").select("*", { count: "exact" });

    if (exam_type) query = query.eq("exam_type", exam_type);
    if (subject) query = query.eq("subject", subject);
    if (chapter) query = query.eq("chapter", chapter);
    if (difficulty) query = query.eq("difficulty_level", difficulty);

    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    const { data, error, count } = await query
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        totalPages: count ? Math.ceil(count / Number(limit)) : 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch problem with solutions
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
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    res.json(problem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProblem = async (req: Request, res: Response) => {
  try {
    const {
      problem_number,
      exam_type,
      subject,
      chapter,
      topic,
      problem_statement,
    } = req.body;

    if (
      !problem_number ||
      !exam_type ||
      !subject ||
      !chapter ||
      !topic ||
      !problem_statement
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("problems")
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
