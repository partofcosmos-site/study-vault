"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Progress</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Problems Solved", value: "142", change: "+12 this week" },
            { label: "Mastered", value: "87", change: "61% of total" },
            {
              label: "Current Streak",
              value: "5 Days",
              change: "Best: 12 days",
            },
            { label: "Review Queue", value: "23", change: "Due today" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Activity Heatmap (Mock) */}
          <div className="md:col-span-2 bg-card border border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-6">Activity Heatmap</h3>
            <div className="grid grid-cols-12 gap-2 h-48">
              {/* Generate some random squares */}
              {Array.from({ length: 84 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${Math.random() > 0.7 ? "bg-primary/80" : Math.random() > 0.4 ? "bg-primary/30" : "bg-secondary"}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Next Reviews */}
          <div className="bg-card border border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-6">Up Next</h3>
            <div className="space-y-4">
              {[
                { id: "1", title: "Rotational Motion Q15", due: "2 hours ago" },
                { id: "2", title: "Thermodynamics Q4", due: "in 1 hour" },
                { id: "3", title: "Integration Basics", due: "in 3 hours" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-red-400">{item.due}</div>
                  </div>
                  <button className="text-xs bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
