import Link from "next/link";

// Mock problem data
const problem = {
  id: "1",
  title: "Projectile Motion with Air Resistance",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "Hard",
  statement: `A ball is thrown at an angle of 45° with the horizontal from ground level with initial velocity v₀ = 20 m/s. 

Assuming the air resistance is proportional to velocity (F_drag = -bv), where b = 0.1 kg/s:

(a) Set up the differential equations of motion.
(b) Find the maximum height reached.
(c) Calculate the range and compare it with the case of no air resistance.

Take g = 10 m/s².`,
  hints: [
    "Divide motion into x and y components",
    "Use Newton's second law: ma = mg - bv",
    "The terminal velocity concept may be useful"
  ],
  solutions: [
    {
      method: "Standard Approach",
      content: `**Step 1: Setting up equations**
      
For x-direction: m(dv_x/dt) = -bv_x
For y-direction: m(dv_y/dt) = -mg - bv_y

**Step 2: Solving the differential equations**

v_x(t) = v₀cos(45°) × e^(-bt/m)
v_y(t) = (v₀sin(45°) + mg/b) × e^(-bt/m) - mg/b

**Step 3: Maximum height**
At maximum height, v_y = 0
H_max ≈ 8.2 m (vs 10 m without air resistance)

**Step 4: Range**
R ≈ 35.4 m (vs 40 m without air resistance)`
    },
    {
      method: "Energy Method (Alternative)",
      content: `Using energy conservation with work done against air resistance...

W_air = ∫F_drag · dr

This approach gives approximate answers but provides physical insight into energy dissipation.`
    }
  ],
  tags: ["JEE Advanced", "Kinematics", "Differential Equations"],
  relatedConcepts: ["Air Resistance", "Terminal Velocity", "Projectile Motion"],
  solvedBy: 1234
};

export default function ProblemDetailPage() {
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
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/problems" className="hover:text-white">Problems</Link>
          <span>/</span>
          <span className="text-white">{problem.title}</span>
        </div>

        {/* Problem Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 text-sm font-medium rounded bg-red-500/20 text-red-400 border border-red-500/30">
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
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-mono text-sm">
            {problem.statement}
          </div>
        </div>

        {/* Hints (Collapsible in real app) */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-400">
            <span className="text-xl">💡</span> Hints
          </h2>
          <ul className="space-y-2">
            {problem.hints.map((hint, i) => (
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

          {problem.solutions.map((solution, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-400">
                Method {i + 1}: {solution.method}
              </h3>
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                {solution.content}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
            ✓ Mark as Solved
          </button>
          <button className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors">
            ⏰ Add to Review Queue
          </button>
        </div>

        {/* Related Concepts */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Related Concepts</h2>
          <div className="flex gap-2">
            {problem.relatedConcepts.map((concept) => (
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
