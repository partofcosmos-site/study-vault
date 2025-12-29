"use client";

import { useState, useEffect } from "react";

// Mock types matching DB schema roughly
interface Solution {
  id: string;
  solution_number: number;
  approach_name: string;
  solution_text: string;
  difficulty_to_understand: number;
  upvotes: number;
}

interface ProblemDetail {
  id: string;
  problem_number: string;
  exam_type: string;
  exam_year: number;
  subject: string;
  chapter: string;
  difficulty_level: number;
  problem_statement: string;
  success_rate: number;
  solutions: Solution[];
}

export default function ProblemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [activeTab, setActiveTab] = useState<"solutions" | "concepts">(
    "solutions",
  );

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        // Note: params.id is available directly in client component props usually,
        // but checking Next.js 15 async params, we might need to await 'params' prop if we used it directly.
        // However, in 'page.tsx' (Server Component) we await params.
        // This is a client component ('use client'). It receives 'params' as prop.
        // In generic Next.js, props to client components are not promises.
        // So using params.id directly is fine here.

        const res = await fetch(`/api/problems/${params.id}`);
        if (!res.ok) throw new Error("Problem not found");
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error("Failed to fetch problem", error);
      }
    };
    fetchProblem();
  }, [params.id]);

  if (!problem)
    return <div className="min-h-screen pt-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Problem Statement */}
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">
                    {problem.exam_type} {problem.exam_year}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">
                    {problem.subject} / {problem.chapter}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{problem.problem_number}</h1>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 font-bold">
                  {problem.difficulty_level}/5
                </span>
                <span className="text-gray-500 text-xs">Difficulty</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {problem.problem_statement}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="text-sm text-gray-400">
                Success Rate:{" "}
                <span className="text-green-400">{problem.success_rate}%</span>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Start Solving
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Solutions & Concepts */}
        <div className="lg:w-1/2">
          <div className="bg-card border border-white/10 rounded-2xl p-6 h-full">
            <div className="flex space-x-4 border-b border-white/10 pb-4 mb-6">
              <button
                onClick={() => setActiveTab("solutions")}
                className={`pb-2 text-sm font-medium transition-colors ${activeTab === "solutions" ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-white"}`}
              >
                Solutions ({problem.solutions.length})
              </button>
              <button
                onClick={() => setActiveTab("concepts")}
                className={`pb-2 text-sm font-medium transition-colors ${activeTab === "concepts" ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-white"}`}
              >
                Prerequisites
              </button>
            </div>

            <div className="space-y-4">
              {problem.solutions.map((sol) => (
                <div
                  key={sol.id}
                  className="bg-secondary/50 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-accent">
                      {sol.approach_name}
                    </h3>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">
                      {sol.upvotes} Upvotes
                    </span>
                  </div>
                  <div className="prose prose-invert prose-sm">
                    <p>{sol.solution_text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
