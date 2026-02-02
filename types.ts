export enum Exchange { NSE = 'NSE', BSE = 'BSE' }
export enum OptionSide { CALL = 'CALL', PUT = 'PUT' }

export interface TradeSuggestion {
  id: string;
  index: 'NIFTY' | 'BANKNIFTY' | 'SENSEX' | 'FINNIFTY';
  contract: string; // e.g. "BANKNIFTY 48200 CE"
  type: 'CALL' | 'PUT';
  strategy: 'SCALP' | 'MOMENTUM' | 'BREAKOUT' | 'REVERSAL';
  entry_range: string;
  target: string;
  stop_loss: string;
  rationale: string;
  expiry: string;
  sources?: { title: string; uri: string }[];
}

export interface WebSignal {
  id: string;
  source: string;
  source_url: string;
  time_ago: string;
  signal_text: string;
  asset: string;
  verification: {
    status: 'VERIFIED' | 'REJECTED' | 'CAUTION';
    score: number; // 0-100
    ai_analysis: string;
  };
}

export interface AIAnalysisResponse {
  action: 'EXECUTABLE' | 'WAIT' | 'AVOID';
  confidence_score: number;
  rationale: string;
  risk_analysis: string;
  sources?: { title: string; uri: string }[];
  prediction: {
    entry_price: number;
    stop_loss: number;
    target_price: number;
    calc_rr: string;
    fii_positioning: string;
    market_sentiment_score: number;
  };
}