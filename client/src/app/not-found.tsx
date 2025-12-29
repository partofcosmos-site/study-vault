import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
            <div className="text-center">
                <div className="text-8xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    404
                </div>
                <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                <p className="text-gray-400 mb-8 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                    Don't worry, even the best students get lost sometimes!
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/problems"
                        className="px-6 py-3 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                    >
                        Browse Problems
                    </Link>
                </div>
            </div>
        </div>
    );
}
