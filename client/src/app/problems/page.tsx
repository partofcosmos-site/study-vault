'use client';
import Link from "next/link";
import { useState, useMemo } from "react";

// Mock data for problems - no database needed
const mockProblems = [
  {
    id: "1",
    title: "Projectile Motion with Air Resistance",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Hard",
    solvedCount: 1234,
    tags: ["JEE Advanced", "Kinematics"],
  },
  {
    id: "2",
    title: "Integration by Parts: Advanced",
    subject: "Math",
    topic: "Calculus",
    difficulty: "Medium",
    solvedCount: 2456,
    tags: ["JEE Main", "Integration"],
  },
  {
    id: "3",
    title: "Electromagnetic Induction in Rotating Coils",
    subject: "Physics",
    topic: "Electromagnetism",
    difficulty: "Hard",
    solvedCount: 876,
    tags: ["JEE Advanced", "EMI"],
  },
  {
    id: "4",
    title: "Complex Numbers: Roots of Unity",
    subject: "Math",
    topic: "Algebra",
    difficulty: "Medium",
    solvedCount: 3124,
    tags: ["JEE Main", "Complex Numbers"],
  },
  {
    id: "5",
    title: "Thermodynamics: Carnot Engine Efficiency",
    subject: "Physics",
    topic: "Thermodynamics",
    difficulty: "Medium",
    solvedCount: 1567,
    tags: ["NEET", "JEE Main"],
  },
  {
    id: "6",
    title: "Differential Equations: First Order Linear",
    subject: "Math",
    topic: "Differential Equations",
    difficulty: "Easy",
    solvedCount: 4521,
    tags: ["JEE Main", "Basics"],
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const filteredProblems = useMemo(() => {
    return mockProblems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSubject = !selectedSubject || problem.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [searchQuery, selectedSubject]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            StudyVault
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/problems" className="text-indigo-400 font-medium">Problems</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/mission-control" className="text-green-400 font-mono text-sm">MISSION CONTROL</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Problem Library</h1>
          <p className="text-gray-400">Master {mockProblems.length}+ verified problems from JEE, NEET, and Olympiads</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search problems by title, topic, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${!selectedSubject
              ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
              : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
              }`}
          >
            All Subjects
          </button>
          {['Physics', 'Math'].map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${selectedSubject === subject
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-4">
          Showing {filteredProblems.length} of {mockProblems.length} problems
        </div>

        {/* Problems Grid */}
        <div className="grid gap-4">
          {filteredProblems.map((problem) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${difficultyColors[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-gray-500 text-sm">{problem.subject} • {problem.topic}</span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-indigo-400 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex gap-2 mt-3">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-400">{problem.solvedCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">students solved</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
