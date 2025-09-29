
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || " " });

export const fetchTitleForUrl = async (url: string): Promise<string> => {
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
    // A simple check to ensure we got a reasonable title
    if (title && title.length > 2) {
      return title;
    }
    // Fallback to domain name if Gemini returns an empty or very short response
    return new URL(url).hostname;

  } catch (error) {
    console.error("Error fetching title from Gemini API:", error);
    // Fallback to domain name on error
    try {
      return new URL(url).hostname;
    } catch {
      return "Invalid URL";
    }
  }
};
