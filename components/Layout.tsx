import React from 'react';
import { LayoutDashboard, LineChart, ShieldCheck, Activity } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'blueprint' | 'analyzer';
  onTabChange: (tab: 'blueprint' | 'analyzer') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <ShieldCheck className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
                  TradeSentinel <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">AI</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">NSE/BSE Decision Support</p>
              </div>
            </div>

            <nav className="flex space-x-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => onTabChange('analyzer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'analyzer'
                    ? 'bg-cyan-500/10 text-cyan-400 shadow-sm border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Trade Analyzer</span>
              </button>
              <button
                onClick={() => onTabChange('blueprint')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'blueprint'
                    ? 'bg-cyan-500/10 text-cyan-400 shadow-sm border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Market Blueprint</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 mt-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600 font-mono">
            SYSTEM STATUS: ONLINE | LATENCY: 24ms | DATA: DELAYED 15M
          </p>
          <p className="text-[10px] text-slate-700 mt-2">
            Disclaimer: TradeSentinel AI is for educational purposes only. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
};