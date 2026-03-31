import { OpenRouter } from "@openrouter/sdk";

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const siteUrl =
  import.meta.env.VITE_OPENROUTER_SITE_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:5173");
const siteName = import.meta.env.VITE_OPENROUTER_SITE_NAME || "VitalPlate";
const defaultModel = "openrouter/auto";

const client = apiKey
  ? new OpenRouter({
      apiKey,
      httpReferer: siteUrl,
      appTitle: siteName,
    })
  : null;

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

const getClient = () => {
  if (!client) {
    throw new Error(
      "OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.",
    );
  }

  return client;
};

const extractText = (completion: any): string => {
  const content = completion?.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : part?.text || ""))
      .join("")
      .trim();
  }

  return "";
};

const cleanJsonText = (text: string) => {
  let cleanedText = text.trim();

  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
  } else if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.replace(/^```/, "").replace(/```$/, "").trim();
  }

  return cleanedText;
};

export const analyzeMeal = async (
  foodDescription: string,
): Promise<MealAnalysis> => {
  const openRouter = getClient();

  const prompt = `Analyze this meal and return only valid JSON with this exact structure:
{
  "name": "A short, descriptive name of the dish",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fat": 0,
  "ingredients": ["main ingredient 1", "main ingredient 2"],
  "vitalScoreImpact": 0,
  "explanation": "A short sentence explaining why it's good or bad for health."
}

Rules:
- Use integers for calories, protein, carbs, fat, and vitalScoreImpact.
- Keep vitalScoreImpact between -20 and 20.
- Do not include markdown or extra commentary.

Meal description: "${foodDescription}"`;

  try {
    const completion = await openRouter.chat.send({
      chatGenerationParams: {
        model: defaultModel,
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "You are an expert nutritionist and food analyst. Return only valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    });

    const textOutput = cleanJsonText(extractText(completion));
    if (!textOutput) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(textOutput);

    return {
      name: parsed.name || foodDescription,
      calories: Number(parsed.calories) || 0,
      protein: Number(parsed.protein) || 0,
      carbs: Number(parsed.carbs) || 0,
      fat: Number(parsed.fat) || 0,
      ingredients: Array.isArray(parsed.ingredients)
        ? parsed.ingredients.map((item: unknown) => String(item))
        : [],
      vitalScoreImpact: Math.max(
        -20,
        Math.min(20, Number(parsed.vitalScoreImpact) || 0),
      ),
      explanation:
        parsed.explanation || "Estimated from the meal description provided.",
    };
  } catch (error) {
    console.error("Error analyzing meal with OpenRouter:", error);
    throw new Error(
      "Failed to analyze the meal. Please check your OpenRouter key and try again.",
    );
  }
};

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export const chatWithCoach = async (
  messageHistory: ChatMessage[],
  userMessage: string,
  user: any,
  meals: any[],
): Promise<string> => {
  const openRouter = getClient();

  const systemPrompt = `You are a highly experienced and friendly AI food coach. Keep your answers concise, practical, and focused on nutrition, health, and dietary choices.
The user is ${user?.name || "a user"}, age ${user?.age || "unknown"}.
They have a daily goal of ${user?.goalCalories || 2000} calories.
Their recent meals: ${
    meals
      .slice(0, 5)
      .map((m) => m.name)
      .join(", ") || "None recently recorded."
  }
The user is vegetarian. Provide actionable and empathetic replies.`;

  try {
    const conversationMessages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      { role: "system", content: systemPrompt },
      ...messageHistory.map((msg) => ({
        role: (msg.role === "model" ? "assistant" : "user") as
          | "assistant"
          | "user",
        content: msg.text,
      })),
      { role: "user", content: userMessage },
    ];

    const completion = await openRouter.chat.send({
      chatGenerationParams: {
        model: defaultModel,
        stream: false,
        messages: conversationMessages,
      },
    });

    const responseText = extractText(completion);
    if (!responseText) {
      throw new Error("No text response from AI");
    }

    return responseText.trim();
  } catch (error) {
    console.error("Error in AI Coach chat:", error);
    throw new Error(
      "Failed to connect to AI Coach. Please check your OpenRouter API key and try again.",
    );
  }
};
