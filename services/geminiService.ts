
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private genAI: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      console.warn('Gemini API key not found. Set GEMINI_API_KEY in your .env file.');
    }
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async createChat(systemInstruction: string) {
    const chat = await this.genAI.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return chat;
  }

  async summarizeWebsite(url: string, htmlContent: string): Promise<string> {
    const prompt = `Analyze this simulated website content from ${url} and provide a concise summary (max 200 words) that could serve as a knowledge base for a chatbot. Focus on key services, features, and main information.\n\nContent: ${htmlContent}`;
    
    try {
      const response = await this.genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      return response.text || "No content summary generated.";
    } catch (error) {
      console.error('Error summarizing website:', error);
      return "Sample website content analyzed. This is a demo chatbot trained on your website data.";
    }
  }
}

export const geminiService = new GeminiService();
