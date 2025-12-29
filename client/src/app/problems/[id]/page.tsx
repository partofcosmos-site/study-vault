'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ReviewItem, createReviewItem, calculateNextReview, ReviewQuality } from "../../../lib/spaced-repetition";

// Types
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
  hints?: string[];
  solutions?: Solution[];
  relatedConcepts?: string[];
}

const defaultHints = [
  "Break down the problem into smaller parts",
  "Recall fundamental principles related to this topic",
  "Check units and dimensions"
];

const defaultRelated = ["Mechanics", "Calculus", "Problem Solving"];

export default function ProblemDetailPage() {
  const params = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/problems/${params.id}`);
        if (!res.ok) throw new Error('Problem not found');
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProblem();
    }
  }, [params.id]);

  // State for interaction
  const [isSolved, setIsSolved] = useState(false);
  const [inReview, setInReview] = useState(false);
  const [showRating, setShowRating] = useState(false);

  // Check status on mount
  useEffect(() => {
    if (problem) {
      const solved = localStorage.getItem('study_vault_solved');
      const reviews = localStorage.getItem('study_vault_smart_reviews'); // Updated key

      if (solved && JSON.parse(solved).includes(problem.id)) setIsSolved(true);
      if (reviews) {
        const reviewList = JSON.parse(reviews);
        if (reviewList.some((r: ReviewItem) => r.id === problem.id)) setInReview(true);
      }
    }
  }, [problem]);

  const toggleSolved = () => {
    if (!problem) return;
    const current = JSON.parse(localStorage.getItem('study_vault_solved') || '[]');
    let updated;
    if (isSolved) {
      updated = current.filter((id: string) => id !== problem.id);
    } else {
      updated = [...current, problem.id];
    }
    localStorage.setItem('study_vault_solved', JSON.stringify(updated));
    setIsSolved(!isSolved);
  };

  const handleRating = (quality: ReviewQuality) => {
    if (!problem) return;

    // Get current items
    const stored = localStorage.getItem('study_vault_smart_reviews');
    const reviews: ReviewItem[] = stored ? JSON.parse(stored) : [];

    // Find or create item
    let item = reviews.find(r => r.id === problem.id) || createReviewItem(problem.id);

    // Calculate new state
    const nextState = calculateNextReview(item, quality);

    // Update storage
    const updated = [
      ...reviews.filter(r => r.id !== problem.id),
      nextState
    ];

    localStorage.setItem('study_vault_smart_reviews', JSON.stringify(updated));
    setInReview(true);
    setShowRating(false);

    // Also mark as solved if quality is good (Hard/Good/Easy)
    if (quality >= 3 && !isSolved) {
      toggleSolved();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="text-gray-400">Loading problem...</div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Problem Not Found</h1>
          <Link href="/problems" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            StudyVault
          </Link>
          <nav className="flex gap-6">
            <Link href="/problems" className="text-indigo-400 font-medium">Problems</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/mission-control" className="text-green-400 font-mono text-sm">MISSION CONTROL</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/problems" className="hover:text-white">Problems</Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{problem.title}</span>
        </div>

        {/* Problem Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 text-sm font-medium rounded border ${problem.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                'bg-green-500/20 text-green-400 border-green-500/30'
              }`}>
              {problem.difficulty}
            </span>
            <span className="text-gray-500">{problem.subject} • {problem.topic}</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
          <div className="flex gap-2">
            {problem.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">📝</span> Problem Statement
          </h2>
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-mono text-sm [&_.katex]:text-indigo-300">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {problem.statement || "No statement available."}
            </ReactMarkdown>
          </div>
        </div>

        {/* Hints (Collapsible in real app) */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
            <span className="text-xl">💡</span> Hints
          </h2>
          <ul className="space-y-2">
            {(problem.hints || defaultHints).map((hint, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-yellow-400 font-bold">{i + 1}.</span>
                {hint}
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>✨</span> Solutions
          </h2>

          {(problem.solutions || []).map((solution, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">
                Method {i + 1}: {solution.method}
              </h3>
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed [&_.katex]:text-indigo-300">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {solution.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {(!problem.solutions || problem.solutions.length === 0) && (
            <div className="text-gray-500 italic">No solution provided yet.</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex gap-4">
            <button
              onClick={toggleSolved}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isSolved
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
                }`}
            >
              {isSolved ? '✓ Solved' : '✓ Mark as Solved'}
            </button>
            <button
              onClick={() => setShowRating(!showRating)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${inReview
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50'
                : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              {inReview ? '🧠 Review Session' : '🧠 Start Memory Training'}
            </button>
          </div>

          {/* Rating Interface */}
          {showRating && (
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
              <div className="text-center mb-3 text-sm text-gray-400">How difficult was this problem?</div>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => handleRating(0)} className="p-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30">Again</button>
                <button onClick={() => handleRating(3)} className="p-2 rounded bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30">Hard</button>
                <button onClick={() => handleRating(4)} className="p-2 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30">Good</button>
                <button onClick={() => handleRating(5)} className="p-2 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30">Easy</button>
              </div>
            </div>
          )}
        </div>

        {/* Related Concepts */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Related Concepts</h2>
          <div className="flex gap-2">
            {(problem.relatedConcepts || defaultRelated).map((concept) => (
              <span key={concept} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
