import React, { useState } from 'react';
import { TradeSuggestion, WebSignal } from '../types';
import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink, Filter, CheckCircle2, AlertOctagon } from 'lucide-react';

// Mock Data Generators
const mockSuggestions: TradeSuggestion[] = [
  {
    id: '1',
    index: 'BANKNIFTY',
    contract: '48200 CE',
    type: 'CALL',
    strategy: 'MOMENTUM',
    entry_range: '340-355',
    target: '420/480',
    stop_loss: '290',
    rationale: 'Strong rejection from 48000 support zone with increasing OI in Puts.',
    expiry: '28 MAR',
  },
  {
    id: '2',
    index: 'NIFTY',
    contract: '22150 PE',
    type: 'PUT',
    strategy: 'REVERSAL',
    entry_range: '110-115',
    target: '150/180',
    stop_loss: '90',
    rationale: 'Nifty facing resistance at 22200 psych level, PCR oversold.',
    expiry: '28 MAR',
  },
  {
    id: '3',
    index: 'FINNIFTY',
    contract: '21400 CE',
    type: 'CALL',
    strategy: 'SCALP',
    entry_range: '85-88',
    target: '105',
    stop_loss: '75',
    rationale: 'Quick scalping opportunity on 5min EMA crossover.',
    expiry: '26 MAR',
  }
];

const mockSignals: WebSignal[] = [
  {
    id: '101',
    source: 'MoneyControl',
    source_url: '#',
    time_ago: '10m ago',
    signal_text: 'HDFC Bank Q4 results preview suggests net profit jump of 15% YoY.',
    asset: 'HDFCBANK',
    verification: {
      status: 'VERIFIED',
      score: 92,
      ai_analysis: 'Positive correlation with BankNifty momentum.'
    }
  },
  {
    id: '102',
    source: 'Twitter (Verified Analyst)',
    source_url: '#',
    time_ago: '45m ago',
    signal_text: 'Reliance forming a double top on 15m timeframe. Watch for breakdown below 2900.',
    asset: 'RELIANCE',
    verification: {
      status: 'CAUTION',
      score: 65,
      ai_analysis: 'Technical pattern valid, but volume confirmation pending.'
    }
  }
];

export const BlueprintView: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CALL' | 'PUT'>('ALL');

  const filteredSuggestions = mockSuggestions.filter(s => filter === 'ALL' || s.type === filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Signal Feed - Left Column */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                Active Trade Setups
            </h2>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                {(['ALL', 'CALL', 'PUT'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                            filter === type 
                            ? 'bg-slate-800 text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-4">
            {filteredSuggestions.map((trade) => (
                <div key={trade.id} className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all hover:shadow-lg hover:shadow-cyan-900/5 overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${trade.type === 'CALL' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                                    trade.type === 'CALL' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                }`}>
                                    {trade.type}
                                </span>
                                <span className="text-xs text-slate-500 font-mono border border-slate-800 px-2 py-0.5 rounded bg-slate-950">
                                    {trade.expiry}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                                {trade.contract}
                            </h3>
                            <span className="text-xs text-slate-500 font-mono tracking-wider">{trade.index} • {trade.strategy}</span>
                        </div>
                        <div className="text-right">
                             <div className="text-xs text-slate-500 uppercase font-mono mb-1">Target</div>
                             <div className="text-lg font-bold text-slate-200 font-mono">{trade.target}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase font-mono">Entry Zone</div>
                            <div className="text-sm font-medium text-slate-300 font-mono">{trade.entry_range}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-slate-500 uppercase font-mono">Stop Loss</div>
                            <div className="text-sm font-medium text-rose-400 font-mono">{trade.stop_loss}</div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                        <span className="text-cyan-500 font-medium">Logic: </span>
                        {trade.rationale}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* Sidebar Signals - Right Column */}
      <div className="lg:col-span-4 space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-500" />
            Live Market Signals
        </h2>

        <div className="space-y-4">
            {mockSignals.map((signal) => (
                <div key={signal.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:bg-slate-900 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
                                {signal.asset}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {signal.time_ago}
                            </span>
                        </div>
                        {signal.verification.status === 'VERIFIED' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                            <AlertOctagon className="w-4 h-4 text-amber-500" />
                        )}
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-3 line-clamp-3">
                        {signal.signal_text}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                        <span className="text-[10px] text-slate-500">
                            Source: {signal.source}
                        </span>
                        <div className="text-[10px] font-mono text-cyan-500 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-900/50">
                            AI Score: {signal.verification.score}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};