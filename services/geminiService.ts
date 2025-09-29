import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI, AI features will be disabled.", error);
    ai = null;
  }
} else {
  console.warn("API_KEY environment variable not set. AI title fetching will be disabled. The app will use hostnames as titles.");
}

export const fetchTitleForUrl = async (url: string): Promise<string> => {
  const fallbackTitle = () => {
    try {
      return new URL(url).hostname;
    } catch {
      return "Invalid URL";
    }
  };

  if (!ai) {
    return fallbackTitle();
  }

  try {
    const prompt = `Please provide a concise and clear title for the webpage at the following URL: ${url}. 
    Focus on the main heading or the most prominent title on the page. 
    Return only the title text, nothing else. 
    If you cannot access the URL or determine a title, return the domain name of the URL.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const title = response.text.trim();
    if (title && title.length > 2) {
      return title;
    }
    return fallbackTitle();

  } catch (error) {
    console.error("Error fetching title from Gemini API:", error);
    return fallbackTitle();
  }
};
