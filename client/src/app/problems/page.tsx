"use client";

import { useState, useEffect } from "react";
import { ProblemCard } from "../../components/ProblemCard";

interface Problem {
  id: string;
  problem_number: string;
  topic: string;
  difficulty_level: number;
  success_rate: number;
  solution_count: number;
  tags: string[];
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedSubject !== "All")
          params.append("subject", selectedSubject);

        // Simple mapping for difficulty until backend supports ranges
        if (selectedDifficulty !== "All") {
          // Extract number if present e.g. "Medium (3)" -> "3"
          const match = selectedDifficulty.match(/\d+/);
          if (match) params.append("difficulty", match[0]);
        }

        const res = await fetch(`/api/problems?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setProblems(data.data || []);
      } catch (error) {
        console.error("Failed to fetch problems", error);
        // Fallback to empty or could keep mock data on error?
        // Better to show empty so user knows connection failed/succeeded.
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [selectedSubject, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-24 bg-card border border-white/5 rounded-xl p-6 shadow-xl">
              <h3 className="font-bold text-lg mb-4">Filters</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-secondary border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option>All</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-secondary border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option>All</option>
                  <option>Easy (1-2)</option>
                  <option>Medium (3)</option>
                  <option>Hard (4-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Browse Problems</h1>
              <span className="text-gray-400">{problems.length} results</span>
            </div>

            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-40 bg-card/50 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {problems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
