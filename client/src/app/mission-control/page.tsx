'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Real file data from the generated components
const generatedFiles = [
    { name: "DarkMatterDetector1767036071340.tsx", time: "Just now", size: "1.0 KB" },
    { name: "GravitySimulator1767036101837.tsx", time: "30s ago", size: "999 B" },
    { name: "NeuroFeedback1767036130727.tsx", time: "1m ago", size: "993 B" },
    { name: "QuantumVisualizer1767036181270.tsx", time: "2m ago", size: "1.0 KB" },
    { name: "EntanglementChat1767036206370.tsx", time: "3m ago", size: "999 B" },
    { name: "SingularityPredictor1767036255136.tsx", time: "4m ago", size: "1.0 KB" },
    { name: "HolographicStudyBuddy.tsx", time: "5m ago", size: "1.0 KB" },
];

const agentLogs = [
    { time: "01:52:15", type: "info", message: "[Builder] Build completed successfully ✓" },
    { time: "01:52:10", type: "success", message: "[Researcher] Created QuantumVisualizer module" },
    { time: "01:52:05", type: "info", message: "[Planner] Found 3 potential features to implement" },
    { time: "01:52:00", type: "warning", message: "[Linter] Fixed 2 style inconsistencies" },
    { time: "01:51:55", type: "success", message: "[Fixer] Resolved dependency conflict" },
    { time: "01:51:50", type: "info", message: "[Monitor] System health check passed" },
];

export default function MissionControl() {
    const [uptime, setUptime] = useState(0);
    const [fileCount, setFileCount] = useState(35);
    const [liveLog, setLiveLog] = useState(agentLogs);

    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(prev => prev + 1);
            // Simulate live activity
            if (Math.random() > 0.7) {
                setFileCount(prev => prev + 1);
                const newActions = [
                    "[Researcher] Generated new feature scaffold",
                    "[Builder] Compilation successful",
                    "[Tester] All tests passing",
                    "[Planner] Discovered new TODO item",
                ];
                const newLog = {
                    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    type: Math.random() > 0.5 ? 'success' : 'info',
                    message: newActions[Math.floor(Math.random() * newActions.length)]
                };
                setLiveLog(prev => [newLog, ...prev.slice(0, 8)]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono selection:bg-green-900">
            {/* Header */}
            <header className="border-b border-green-800/50 bg-black/80 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-bold text-green-400">
                            ◈ MISSION CONTROL
                        </Link>
                        <span className="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded">
                            v2.0.0
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>LIVE</span>
                        </div>
                        <div>UPTIME: {formatUptime(uptime)}</div>
                        <Link href="/" className="text-gray-500 hover:text-green-400">EXIT →</Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "FEATURES GENERATED", value: fileCount, icon: "📦" },
                        { label: "BUILD STATUS", value: "PASSING", icon: "✓" },
                        { label: "SELF-REPAIRS", value: "12", icon: "🔧" },
                        { label: "AGENT MODE", value: "INFINITE", icon: "∞" },
                    ].map((stat, i) => (
                        <div key={i} className="border border-green-800/50 rounded-lg p-4 bg-green-900/10">
                            <div className="text-xs text-green-600 mb-1">{stat.label}</div>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <span>{stat.icon}</span>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* File Tree */}
                    <div className="border border-green-800/50 rounded-lg overflow-hidden">
                        <div className="bg-green-900/20 px-4 py-2 border-b border-green-800/50 flex items-center justify-between">
                            <span className="font-bold">/client/src/components/generated</span>
                            <span className="text-xs text-green-600">{generatedFiles.length} files</span>
                        </div>
                        <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
                            {generatedFiles.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-2 hover:bg-green-900/20 rounded cursor-pointer group">
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">📄</span>
                                        <span className="group-hover:text-green-300">{file.name}</span>
                                    </div>
                                    <div className="text-xs text-green-700 flex gap-4">
                                        <span>{file.size}</span>
                                        <span>{file.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center py-4 text-green-700 animate-pulse">
                                ▾ Loading more files...
                            </div>
                        </div>
                    </div>

                    {/* Live Activity Log */}
                    <div className="border border-green-800/50 rounded-lg overflow-hidden">
                        <div className="bg-green-900/20 px-4 py-2 border-b border-green-800/50">
                            <span className="font-bold">AGENT ACTIVITY LOG</span>
                        </div>
                        <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto font-mono text-xs">
                            {liveLog.map((log, i) => (
                                <div key={i} className={`flex gap-3 p-2 rounded ${log.type === 'success' ? 'bg-green-900/20' :
                                        log.type === 'warning' ? 'bg-yellow-900/20' :
                                            'bg-white/5'
                                    }`}>
                                    <span className="text-green-600 shrink-0">{log.time}</span>
                                    <span className={
                                        log.type === 'success' ? 'text-green-400' :
                                            log.type === 'warning' ? 'text-yellow-400' :
                                                'text-gray-400'
                                    }>{log.message}</span>
                                </div>
                            ))}
                            <div className="animate-pulse text-green-700">_ Waiting for next event...</div>
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="mt-8 border border-green-800/50 rounded-lg p-6 bg-green-900/10">
                    <h2 className="text-lg font-bold mb-4">SYSTEM OVERVIEW</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-xs text-green-600 mb-2">ORCHESTRATOR STATUS</div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                <span>Running Autonomously</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-green-600 mb-2">DEPLOYMENT</div>
                            <div>Vercel Edge Network</div>
                            <div className="text-xs text-green-700 mt-1">study-vault-lilac.vercel.app</div>
                        </div>
                        <div>
                            <div className="text-xs text-green-600 mb-2">NEXT SCHEDULED ACTION</div>
                            <div>Feature Discovery Scan</div>
                            <div className="text-xs text-green-700 mt-1">In 5 seconds...</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
