import React, { useState } from 'react';
import { Send, Zap, AlertTriangle, TrendingUp, TrendingDown, Target, Shield, DollarSign, Activity } from 'lucide-react';
import { analyzeTradeScenario } from '../services/geminiService';
import { AIAnalysisResponse } from '../types';

export const TradeAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setAnalysis(null);
    
    // Simulate thinking time for better UX if API is too fast, but usually Gemini is quick
    try {
        const result = await analyzeTradeScenario(input);
        setAnalysis(result);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'EXECUTABLE': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'AVOID': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      default: return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            New Analysis
          </h2>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label htmlFor="scenario" className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wide">
                Trade Scenario / Setup
              </label>
              <textarea
                id="scenario"
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. NIFTY 50 trading at 22,100 near support. Thinking of buying 22200 CE for a bounce target 22300..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none resize-none font-mono text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-900/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Analyzing Market Data...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyze Setup
                </>
              )}
            </button>
          </form>
          <div className="mt-4 p-3 bg-slate-950/50 rounded border border-slate-800/50">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-400">PRO TIP:</span> Be specific. Include the index, strike price, current spot price, and your rationale for better accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-2">
        {!analysis && !loading && (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-300">Awaiting Input</h3>
            <p className="text-slate-500 max-w-sm mt-2 text-sm">
              Enter a trade idea on the left to generate a comprehensive AI risk assessment and technical breakdown.
            </p>
          </div>
        )}

        {analysis && (
          <div className="space-y-6 animate-fade-in">
            {/* Action Banner */}
            <div className={`rounded-xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${getActionColor(analysis.action)}`}>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-bold tracking-tight">{analysis.action}</h2>
                  <div className="px-2.5 py-0.5 rounded-full bg-slate-950/20 text-xs font-mono font-bold border border-current">
                    CONFIDENCE: {analysis.confidence_score}%
                  </div>
                </div>
                <p className="text-sm font-medium opacity-90">Recommendation based on technical structure & risk</p>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-xs font-mono opacity-70 uppercase tracking-widest">Calculated RR</div>
                <div className="text-2xl font-mono font-bold">{analysis.prediction.calc_rr}</div>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">Entry Range</div>
                <div className="text-xl font-mono font-bold text-slate-200">
                    <span className="text-slate-500 mr-1">₹</span>
                    {analysis.prediction.entry_price}
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">Target</div>
                <div className="text-xl font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {analysis.prediction.target_price}
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">Stop Loss</div>
                <div className="text-xl font-mono font-bold text-rose-400 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {analysis.prediction.stop_loss}
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">Sentiment</div>
                <div className={`text-xl font-mono font-bold ${analysis.prediction.market_sentiment_score > 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {analysis.prediction.market_sentiment_score}/100
                </div>
              </div>
            </div>

            {/* Deep Dive Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                    Rationale & FII Data
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {analysis.rationale}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                    <DollarSign className="w-3 h-3 text-amber-500" />
                    <span className="text-slate-500">FII POSITIONING:</span>
                    <span className="text-slate-200 font-bold">{analysis.prediction.fii_positioning}</span>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Risk Analysis
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                    {analysis.risk_analysis}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};