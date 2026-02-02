import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTradeScenario = async (scenario: string): Promise<AIAnalysisResponse> => {
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are TradeSentinel AI, a SEBI Registered Research Analyst and risk management expert specializing in the Indian derivatives market (NSE/BSE). 
    Your goal is to analyze user trade ideas or market setups with extreme scrutiny. 
    Prioritize capital preservation. Be direct, professional, and data-driven.
    Focus on Risk:Reward ratios, FII/DII positioning, and technical structure.
    Strictly output JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze this trade setup for the Indian Market: "${scenario}". 
      Provide a structured analysis focusing on entry, exit, stop loss, and risk.
      If the user provides a vague input, assume standard market conditions but lower the confidence score.`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: {
              type: Type.STRING,
              enum: ['EXECUTABLE', 'WAIT', 'AVOID']
            },
            confidence_score: {
              type: Type.NUMBER,
              description: "Confidence score between 0 and 100"
            },
            rationale: {
              type: Type.STRING,
              description: "Detailed technical and fundamental reasoning"
            },
            risk_analysis: {
              type: Type.STRING,
              description: "Specific risks involved (e.g., event risk, theta decay)"
            },
            prediction: {
              type: Type.OBJECT,
              properties: {
                entry_price: { type: Type.NUMBER },
                stop_loss: { type: Type.NUMBER },
                target_price: { type: Type.NUMBER },
                calc_rr: { type: Type.STRING, description: "Risk to Reward Ratio string, e.g. '1:2.5'" },
                fii_positioning: { type: Type.STRING, description: "Estimated FII stance: Bullish/Bearish/Neutral" },
                market_sentiment_score: { type: Type.NUMBER, description: "0 (Extreme Fear) to 100 (Extreme Greed)" }
              },
              required: ['entry_price', 'stop_loss', 'target_price', 'calc_rr', 'fii_positioning', 'market_sentiment_score']
            }
          },
          required: ['action', 'confidence_score', 'rationale', 'risk_analysis', 'prediction']
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from AI");
    }
    return JSON.parse(text) as AIAnalysisResponse;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Return a safe fallback to prevent app crash
    return {
      action: 'AVOID',
      confidence_score: 0,
      rationale: "Analysis service temporarily unavailable or API error.",
      risk_analysis: "System error. Do not trade.",
      prediction: {
        entry_price: 0,
        stop_loss: 0,
        target_price: 0,
        calc_rr: "N/A",
        fii_positioning: "Unknown",
        market_sentiment_score: 50
      }
    };
  }
};