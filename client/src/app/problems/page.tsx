'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";



// Types for our problem data
interface Solution {
  method: string;
  content: string;
}

interface Problem {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  solvedCount: number;
  tags: string[];
  statement?: string;
  solutions?: Solution[];
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Keyboard Navigation
  const router = useRouter();
  const selectedIndex = useKeyboardNavigation(
    problems.length,
    (index) => router.push(`/problems/${problems[index].id}`)
  );

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedSubject) params.append('subject', selectedSubject);
        if (searchQuery) params.append('query', searchQuery);

        const res = await fetch(`/api/problems?${params.toString()}`);
        const data = await res.json();
        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchProblems();
    }, 300);

    return () => clearTimeout(timeoutId);
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
          <p className="text-gray-400">Master 100+ verified problems from JEE, NEET, and Olympiads</p>
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
          Showing {problems.length} problems
        </div>

        {/* Problems Grid */}
        <div className="grid gap-4">
          {loading ? (
            <div className="col-span-1 text-center py-12 text-gray-400">
              <div className="inline-block w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
              <div>Loading problems...</div>
            </div>
          ) : problems.length === 0 ? (
            <div className="col-span-1 text-center py-12 text-gray-400 bg-white/5 rounded-xl border border-white/10">
              No problems found matching your criteria.
            </div>
          ) : (
            problems.map((problem, index) => (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {index === selectedIndex && <span className="text-indigo-400">▶</span>}
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}
