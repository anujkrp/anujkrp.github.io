import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is missing. Chatbot will run in fallback mode.");
  }
} catch (error) {
  console.error("Failed to initialize Gemini API Client:", error);
}

// API endpoint for chatbot
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  // System instruction to guide the AI persona
  const systemInstruction = `You are AK Smart Assistant, the premium interactive AI representative of AK Design Studio (founded by Anuj Kumar, a leading digital solutions expert, Full Stack Developer, AI Automation specialist, Web Designer, and Digital Marketing Consultant).
Your goal is to converse with prospective clients, answer questions about our services, estimate rough budgets, build trust, and help them take the next step.

Tone: Professional, elite SaaS aesthetic, warm, helpful, client-oriented, and highly knowledgeable. Avoid robotic or spammy responses.

Our Core Services & Starting Pricing:
1. Website Development: Customized business websites, premium e-commerce, high-converting landing pages, custom CMS. Starts at $1,500.
2. Software Development: Tailored CRM/ERP dashboards, billing software, custom client portals, booking engines. Starts at $3,500.
3. AI & Automation: Custom AI chatbots, autonomous lead qualification, visual workflow automation, AI agents. Starts at $2,000.
4. Digital Marketing & SEO: Data-driven campaigns, Google/Facebook Ads, local SEO optimization, growth consulting. Starts at $800/month.
5. Cloud Hosting & Devops: Secure VPS configuration, auto-scaling deployment, ongoing security. Starts at $150/month.

Key Studio Strengths:
- 100% custom architectures (No template-cloning).
- Fully SEO optimized and mobile-responsive layouts.
- Cutting-edge AI integration to streamline business workflows.
- Ongoing dedicated support and lightning-fast loading speeds (Lighthouse 95+).

Call To Action:
- Encourage users to book a consultation slot using the live calendar on the website or fill out the 'Get Free Consultation' lead form.
- If they share project details here, assure them that Anuj Kumar (AK) will personally follow up with them within 24 hours. Keep answers brief and formatted beautifully with markdown.`;

  if (!ai) {
    // Return friendly local fallback response if API Key is not set yet
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    return res.json({
      reply: `Hi! I am the AK Smart Assistant. I am currently running in offline preview mode because the server-side API keys are being configured. 

Anuj and our team at AK Design Studio specialize in Website Development, Custom Software (CRM/ERP), AI Automation (Chatbots & workflows), and Digital Marketing.

If you would like a custom solution, please use the lead form or schedule a consultation on the live calendar right here on our page! We look forward to working with you.`
    });
  }

  try {
    // Map client-side message format to Gemini API format
    // Clients send { role: 'user' | 'assistant', content: string }
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I could not formulate a response. How else may I assist you today?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate chat response. " + (error.message || "") });
  }
});

// Setup Vite or Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AK Design Studio Server running on http://localhost:${PORT}`);
  });
}

startServer();
