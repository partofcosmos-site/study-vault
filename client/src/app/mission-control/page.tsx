'use client';
import React, { useState, useEffect } from 'react';

// This is the "GitHub-like" Mission Control for the Agent
export default function MissionControl() {
    const [logs, setLogs] = useState<string[]>([]);
    const [fileCount, setFileCount] = useState(0);

    useEffect(() => {
        // Simulate real-time connection to the agent
        const interval = setInterval(() => {
            // In a real app we'd fetch from an API, here we simulate the "Live Feed"
            // since we can't easily set up a websocket in one shot.
            setFileCount(prev => prev + 1);
            setLogs(prev => [
                `[${new Date().toLocaleTimeString()}] Researcher Agent created new feature module...`,
                ...prev.slice(0, 10)
            ]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-8 selection:bg-green-900">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 border-b border-green-800/50 pb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold glitch-effect">MISSION CONTROL</h1>
                        <p className="text-sm text-green-600 mt-2">Autonomous Agent Command Center</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">{fileCount}</div>
                        <div className="text-xs uppercase opacity-50">Features Generated</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Project Status */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="border border-green-800/50 rounded-lg p-6 bg-green-900/10 backdrop-blur">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                System Status: ONLINE
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-black/50 rounded border border-green-900/50">
                                    <div className="text-xs opacity-50 mb-1">UPTIME</div>
                                    <div className="text-xl">Infinity</div>
                                </div>
                                <div className="p-4 bg-black/50 rounded border border-green-900/50">
                                    <div className="text-xs opacity-50 mb-1">MODE</div>
                                    <div className="text-xl">Watcher (Autonomous)</div>
                                </div>
                                <div className="p-4 bg-black/50 rounded border border-green-900/50">
                                    <div className="text-xs opacity-50 mb-1">SELF-REPAIR</div>
                                    <div className="text-xl">Active</div>
                                </div>
                                <div className="p-4 bg-black/50 rounded border border-green-900/50">
                                    <div className="text-xs opacity-50 mb-1">CREATIVITY</div>
                                    <div className="text-xl">Unbounded</div>
                                </div>
                            </div>
                        </div>

                        {/* Repository View (GitHub-like) */}
                        <div className="border border-green-800/50 rounded-lg overflow-hidden">
                            <div className="bg-green-900/20 p-3 border-b border-green-800/50 font-bold">
                                /client/src/components/generated
                            </div>
                            <div className="p-4 bg-black/80 space-y-2 max-h-[400px] overflow-y-auto">
                                {/* We would map actual files here if we had the list passed in */}
                                <div className="flex items-center gap-3 p-2 hover:bg-green-900/20 cursor-pointer rounded">
                                    <span className="text-2xl">📄</span>
                                    <div>
                                        <div className="font-bold">DarkMatterDetector.tsx</div>
                                        <div className="text-xs opacity-50">Updated just now</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 hover:bg-green-900/20 cursor-pointer rounded">
                                    <span className="text-2xl">📄</span>
                                    <div>
                                        <div className="font-bold">QuantumVisualizer.tsx</div>
                                        <div className="text-xs opacity-50">Updated 10s ago</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 hover:bg-green-900/20 cursor-pointer rounded">
                                    <span className="text-2xl">📄</span>
                                    <div>
                                        <div className="font-bold">NeuroFeedback.tsx</div>
                                        <div className="text-xs opacity-50">Updated 45s ago</div>
                                    </div>
                                </div>
                                <div className="p-4 text-center text-xs opacity-30 animate-pulse">
                                    Scanning file system...
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Agent Feed */}
                    <div className="border border-green-800/50 rounded-lg p-6 bg-black h-full">
                        <h2 className="text-xl font-bold mb-4">AGENT ACTIVITY LOG</h2>
                        <div className="space-y-4 font-mono text-xs">
                            {logs.map((log, i) => (
                                <div key={i} className="border-l-2 border-green-500 pl-3 py-1 opacity-80">
                                    {log}
                                </div>
                            ))}
                            <div className="animate-pulse opacity-50">_ Waiting for next thought...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
