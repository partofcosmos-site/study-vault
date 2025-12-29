import Link from "next/link";
import { InfiniteFeatures } from "@/components/InfiniteFeatures";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                StudyVault
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link
                  href="/problems"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Problems
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <a
                  href="#"
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  Get Started
                </a>
                <Link
                  href="/mission-control"
                  className="bg-green-900/50 hover:bg-green-900 text-green-400 border border-green-500/30 px-3 py-1 rounded text-xs font-mono ml-4"
                >
                  MISSION CONTROL
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-6 animate-slide-up">
            ✨ The #1 Platform for Competitive Exams
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-slide-up leading-tight">
            Master the Hardest <br />
            <span className="bg-gradient-to-r from-primary via-accent to-blue-500 bg-clip-text text-transparent pb-2">
              Physics & Math Problems
            </span>
          </h1>
          <p
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            The largest verified database for JEE, NEET, and Olympiads. Powered
            by{" "}
            <span className="text-white font-medium">
              intelligent spaced repetition
            </span>{" "}
            to ensure you never forget a concept.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href="/problems"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
            >
              Start Solving Free
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-secondary/50 hover:bg-secondary/80 text-foreground rounded-xl font-semibold text-lg transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-24 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Verified Problems", value: "5000+" },
              { label: "Active Students", value: "10k+" },
              { label: "Accuracy Rate", value: "98%" },
              { label: "Forever Tier", value: "Free" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why StudyVault?
            </h2>
            <p className="text-gray-400 text-lg">
              Built for toppers, by toppers. Everything you need to excel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Spaced Repetition",
                desc: "Never forget a formula again. Our AI schedules reviews at the perfect time intervals for maximum retention.",
                icon: "🧠",
              },
              {
                title: "Multiple Solutions",
                desc: "Learn the standard method, the shortcut, and the 'topper's trick' for every problem.",
                icon: "⚡",
              },
              {
                title: "Concept Mapping",
                desc: "Visualize prerequisites. Know exactly what you need to study to solve a problem effectively.",
                icon: "🗺️",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl glass-card hover:bg-secondary/40 transition-all hover:-translate-y-2 border border-white/5 hover:border-primary/20"
              >
                <div className="text-4xl mb-6 bg-secondary/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Features Section */}
      <InfiniteFeatures />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 StudyVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
