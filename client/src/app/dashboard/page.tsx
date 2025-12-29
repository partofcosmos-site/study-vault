'use client';
import Link from "next/link";
import { useState } from "react";

// Mock user data
const userData = {
  name: "Student",
  streakDays: 14,
  problemsSolved: 156,
  accuracy: 78,
  rank: "Top 5%",
  reviewQueue: 8,
};

const recentProblems = [
  { id: "1", title: "Projectile Motion", status: "solved", score: 100 },
  { id: "2", title: "Integration by Parts", status: "reviewing", nextReview: "2h" },
  { id: "3", title: "EM Induction", status: "struggling", attempts: 3 },
  { id: "4", title: "Complex Numbers", status: "solved", score: 85 },
];

const upcomingReviews = [
  { title: "Newton's Laws", dueIn: "Now", urgency: "high" },
  { title: "Trigonometric Identities", dueIn: "2h", urgency: "medium" },
  { title: "Wave Optics", dueIn: "Tomorrow", urgency: "low" },
];

const statusColors: Record<string, string> = {
  solved: "text-green-400",
  reviewing: "text-yellow-400",
  struggling: "text-red-400",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'stats'>('overview');

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            StudyVault
          </Link>
          <nav className="flex gap-6">
            <Link href="/problems" className="text-gray-400 hover:text-white transition-colors">Problems</Link>
            <Link href="/dashboard" className="text-indigo-400 font-medium">Dashboard</Link>
            <Link href="/mission-control" className="text-green-400 font-mono text-sm">MISSION CONTROL</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}! 👋</h1>
          <p className="text-gray-400">Your learning journey continues. You're on a {userData.streakDays}-day streak!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-5">
            <div className="text-3xl font-bold text-indigo-400">{userData.problemsSolved}</div>
            <div className="text-sm text-gray-400 mt-1">Problems Solved</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5">
            <div className="text-3xl font-bold text-green-400">{userData.accuracy}%</div>
            <div className="text-sm text-gray-400 mt-1">Accuracy Rate</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-5">
            <div className="text-3xl font-bold text-orange-400">{userData.streakDays}</div>
            <div className="text-sm text-gray-400 mt-1">Day Streak 🔥</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-5">
            <div className="text-3xl font-bold text-purple-400">{userData.rank}</div>
            <div className="text-sm text-gray-400 mt-1">Global Rank</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
          {(['overview', 'reviews', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content based on tab */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Problems</h2>
            <div className="space-y-3">
              {recentProblems.map((problem) => (
                <div key={problem.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium">{problem.title}</div>
                    <div className={`text-sm ${statusColors[problem.status]}`}>
                      {problem.status === 'solved' && `✓ Solved (${problem.score}%)`}
                      {problem.status === 'reviewing' && `⏰ Review in ${problem.nextReview}`}
                      {problem.status === 'struggling' && `⚠ ${problem.attempts} attempts`}
                    </div>
                  </div>
                  <Link href={`/problems/${problem.id}`} className="text-indigo-400 hover:text-indigo-300">
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Queue */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🧠</span> Spaced Repetition Queue
              <span className="ml-auto bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-sm">
                {userData.reviewQueue} due
              </span>
            </h2>
            <div className="space-y-3">
              {upcomingReviews.map((review, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="font-medium">{review.title}</div>
                  <div className={`text-sm px-2 py-0.5 rounded ${review.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                      review.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                    }`}>
                    {review.dueIn}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Start Review Session
            </button>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
          <div className="h-48 flex items-end justify-around gap-2">
            {[40, 65, 45, 80, 70, 55, 90].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
