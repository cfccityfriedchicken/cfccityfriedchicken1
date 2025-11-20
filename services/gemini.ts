import { GoogleGenAI } from "@google/genai";
import { menuData } from "../data";
import { MenuItem } from "../types";

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Chef CFC", the friendly AI assistant for "City Fried Chicken" (CFC).
Your goal is to help customers choose food from our menu and answer questions about our service.

Here is our Menu Data:
${JSON.stringify(menuData.map(item => `${item.name} (${item.category}): ${item.description} - Price: ${item.price}`))}

Rules:
1. Be enthusiastic and hungry! Use emojis like 🍗, 🍕, 🍔, 🍟.
2. Only recommend items from the provided menu.
3. Recommend our Pizza and Royal Premium flavors if they ask for something special.
4. Keep responses short and helpful (under 50 words if possible).
5. If asked about delivery, say we deliver city-wide in 30 minutes.
`;

export const chatWithChef = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "Sorry, I'm busy cooking! Try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My connection to the kitchen is lost. Please check your internet.";
  }
};

export const fetchMenuData = async (): Promise<MenuItem[]> => {
  // Simulating an API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuData);
    }, 500);
  });
};