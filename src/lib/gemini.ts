import { GoogleGenAI } from '@google/genai';

// Initialize the API using the key from env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export interface MealAnalysis {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  vitalScoreImpact: number;
  explanation: string;
}

export const analyzeMeal = async (foodDescription: string): Promise<MealAnalysis> => {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const prompt = `
You are an expert nutritionist and food analyst. Analyze the following meal description (which might be a vegetarian dish or any dish).
Return a JSON object strictly following this structure, with no markdown formatting or extra text:
{
  "name": "A short, descriptive name of the dish",
  "calories": (integer, estimated total calories),
  "protein": (integer, estimated grams of protein),
  "carbs": (integer, estimated grams of carbohydrates),
  "fat": (integer, estimated grams of fat),
  "ingredients": ["list", "of", "main", "ingredients"],
  "vitalScoreImpact": (integer from -20 to 20 representing the health impact. positive for healthy, negative for unhealthy),
  "explanation": "A short sentence explaining why it's good or bad for health."
}

Meal description: "${foodDescription}"
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const textOutput = response.text;
    if (!textOutput) throw new Error("No response from AI");

    // Clean up potential markdown formatting code blocks
    let cleanedText = textOutput.trim();
    if (cleanedText.startsWith('\`\`\`json')) {
      cleanedText = cleanedText.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (cleanedText.startsWith('\`\`\`')) {
      cleanedText = cleanedText.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }

    const data: MealAnalysis = JSON.parse(cleanedText);
    return data;
  } catch (error) {
    console.error("Error analyzing meal with Gemini:", error);
    throw new Error("Failed to analyze the meal. Wait a moment and try again.");
  }
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const chatWithCoach = async (messageHistory: ChatMessage[], userMessage: string, user: any, meals: any[]): Promise<string> => {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const systemPrompt = `You are a highly experienced and friendly AI food coach. Keep your answers concise, practical, and focused on nutrition, health, and dietary choices. 
The user is ${user?.name || 'a user'}, age ${user?.age || 'unknown'}. 
They have a daily goal of ${user?.goalCalories || 2000} calories.
Their recent meals: ${meals.slice(0, 5).map(m => m.name).join(', ') || 'None recently recorded.'}
The user is vegetarian. Provide actionable and empathetic replies.`;

  // Transform to Gemini Content format
  const contents = messageHistory.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  // Append the new message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents,
      config: {
        systemInstruction: systemPrompt
      }
    });

    if (!response.text) throw new Error("No text response from AI");
    return response.text;
  } catch (error) {
    console.error("Error in AI Coach chat:", error);
    throw new Error("Failed to connect to AI Coach. Please check your API key and try again.");
  }
};
