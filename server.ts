import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Simple in-memory cache
const translationCache: Record<string, string> = {};

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  app.post("/api/translate", async (req, res) => {
    const { text, targetLanguage } = req.body;
    const cacheKey = `${targetLanguage}:${text}`;
    
    if (translationCache[cacheKey]) {
      return res.json({ translatedText: translationCache[cacheKey] });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Translate the following text into ${targetLanguage}: "${text}"`,
      });
      const translatedText = response.text || text;
      translationCache[cacheKey] = translatedText;
      res.json({ translatedText });
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Translation failed" });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
