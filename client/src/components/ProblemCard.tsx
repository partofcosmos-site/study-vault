import Link from "next/link";

interface Problem {
  id: string;
  problem_number: string;
  topic: string;
  difficulty_level: number;
  success_rate: number;
  solution_count: number;
}

export const ProblemCard = ({ problem }: { problem: Problem }) => {
  return (
    <Link href={`/problems/${problem.id}`} className="block group">
      <div className="glass-card hover:bg-secondary/40 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-12 translate-x-8 group-hover:bg-primary/20 transition-all"></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">
                {problem.problem_number}
              </span>
              {problem.success_rate < 30 && (
                <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                  HARD
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {problem.topic}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div
              className="flex space-x-0.5"
              title={`Difficulty: ${problem.difficulty_level}/5`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm transform transition-all ${star <= problem.difficulty_level ? "text-yellow-400 scale-100" : "text-gray-800 scale-90"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400 border-t border-white/5 pt-4 mt-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span
                className={`w-2 h-2 rounded-full ${problem.success_rate > 50 ? "bg-green-500" : "bg-orange-500"}`}
              ></span>
              <span>{problem.success_rate}% Success</span>
            </span>
          </div>
          <div className="flex items-center font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
            <span>{problem.solution_count} Solutions</span>
            <svg
              className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};
