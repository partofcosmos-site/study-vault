export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center">
            <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                    {/* Spinner */}
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-300">Loading...</h2>
                <p className="text-gray-500 text-sm mt-2">Preparing your study materials</p>
            </div>
        </div>
    );
}
