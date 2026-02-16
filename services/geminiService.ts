
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS } from "../constants.tsx";

export class PortfolioAIService {
  private ai: GoogleGenAI | null = null;
  private chat: any = null;

  constructor() {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        console.warn("Gemini API Key is missing. AI Assistant will be disabled.");
        return;
      }
      
      this.ai = new GoogleGenAI({ apiKey });
      
      const context = `
        You are the AI Assistant for Nandhika S's student portfolio.
        Nandhika's Identity:
        - Name: Nandhika S
        - Current Status: 2nd Year Undergraduate, B.Tech in Artificial Intelligence & Data Science.
        - Institution: ${PERSONAL_INFO.education}
        - Academic Performance: CGPA of ${PERSONAL_INFO.cgpa}, consistently in the Top 5 of her class.
        
        Her Core Skills:
        - Programming: Python (Expert), JavaScript, SQL.
        - Frameworks: React.js, Django, Flutter (ZenMode App), Node.js.
        - Data/AI: Scikit-Learn (GreenTrack AI), MongoDB, Power BI.
        
        Key Projects:
        1. GreenTrack AI: ML model for predicting CO2 levels.
        2. ZenMode: Student productivity mobile app using Flutter.
        3. Feastify: Food ordering platform with robust backend.
        
        Achievements:
        - Finalist at CARE Hackathon 2025 (Skin Medical Patch).
        - Participant in Sakthi Hackathon.
        - Club Coordinator/Leadership roles.

        Response Style:
        - Professional, academic, and modern.
        - Be very helpful to potential recruiters or collaborators.
        - If asked about her future, emphasize her interest in ML research and sustainable technology.
        - Keep responses to 2-3 sentences max unless a detailed explanation is requested.
        - Do not hallucinate. If you don't know something about her, say "I'm not sure about that specific detail, but you can reach her at ${PERSONAL_INFO.email}."
      `;

      this.chat = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: context,
          temperature: 0.7,
        },
      });
    } catch (e) {
      console.error("Failed to initialize PortfolioAIService:", e);
    }
  }

  async sendMessage(message: string) {
    if (!this.chat) return "I'm currently offline. Please use the contact form to reach Nandhika!";
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("AI Assistant Error:", error);
      return "I'm having a little trouble thinking right now. You can contact Nandhika directly via the contact form!";
    }
  }

  async *sendMessageStream(message: string) {
    if (!this.chat) {
      yield "I'm currently offline. Please reach out via the contact form.";
      return;
    }
    try {
      const stream = await this.chat.sendMessageStream({ message });
      for await (const chunk of stream) {
        yield chunk.text;
      }
    } catch (error) {
      console.error("AI Assistant Stream Error:", error);
      yield "Connection error. Please try again.";
    }
  }
}
