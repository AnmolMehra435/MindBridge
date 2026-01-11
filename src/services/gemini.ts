import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY environment variable.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface GeminiResponse {
  emotionAnalysis: string;
  parentSuggestions: string[];
  conversationStarters: string[];
  activities: string[];
}

export async function analyzeEmotion(
  emotion: string,
  childMessage: string,
  childAge?: number
): Promise<GeminiResponse> {
  if (!genAI) {
    // Fallback responses when API is not available
    return getFallbackResponse(emotion);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
    You are a child psychologist and parenting expert. A child is feeling "${emotion}" and shared this message: "${childMessage}".
    ${childAge ? `The child is ${childAge} years old.` : ''}
    
    Please provide a comprehensive analysis in JSON format with the following structure:
    {
      "emotionAnalysis": "Brief analysis of what the child might be experiencing",
      "parentSuggestions": ["3-4 specific, actionable suggestions for parents"],
      "conversationStarters": ["2-3 gentle conversation starters"],
      "activities": ["2-3 activities that might help the child"]
    }
    
    Keep responses empathetic, practical, and age-appropriate. Focus on building connection and understanding.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON response
    try {
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      return getFallbackResponse(emotion);
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return getFallbackResponse(emotion);
  }
}

function getFallbackResponse(emotion: string): GeminiResponse {
  const fallbackResponses: Record<string, GeminiResponse> = {
    sad: {
      emotionAnalysis: "Your child is feeling sad and may need extra comfort and reassurance.",
      parentSuggestions: [
        "Offer a warm hug and physical comfort",
        "Listen without judgment to what's troubling them",
        "Validate their feelings - it's okay to feel sad",
        "Spend quiet time together doing something they enjoy"
      ],
      conversationStarters: [
        "I notice you seem sad today. Would you like to talk about it?",
        "What's on your mind? I'm here to listen."
      ],
      activities: [
        "Read a favorite book together",
        "Draw or color feelings",
        "Watch a comforting movie"
      ]
    },
    angry: {
      emotionAnalysis: "Your child is experiencing anger and needs help understanding and managing these big feelings.",
      parentSuggestions: [
        "Help them identify the source of their anger",
        "Teach deep breathing or counting techniques",
        "Provide a safe space to express emotions",
        "Model calm behavior and emotional regulation"
      ],
      conversationStarters: [
        "I can see you're feeling angry. What happened?",
        "It's okay to feel angry. Let's talk about it together."
      ],
      activities: [
        "Physical activity like running or jumping",
        "Punching a pillow or stress ball",
        "Writing or drawing about what made them angry"
      ]
    },
    anxious: {
      emotionAnalysis: "Your child is feeling worried or anxious and may need reassurance and coping strategies.",
      parentSuggestions: [
        "Acknowledge their worries without dismissing them",
        "Practice relaxation techniques together",
        "Break down overwhelming tasks into small steps",
        "Maintain predictable routines and structure"
      ],
      conversationStarters: [
        "What's worrying you right now?",
        "Let's think about this together. I'm here to help."
      ],
      activities: [
        "Practice deep breathing exercises",
        "Create a worry box to write down concerns",
        "Do something familiar and comforting"
      ]
    }
  };

  return fallbackResponses[emotion.toLowerCase()] || {
    emotionAnalysis: `Your child is feeling ${emotion} and needs your understanding and support.`,
    parentSuggestions: [
      "Listen actively to what they're expressing",
      "Validate their emotional experience",
      "Offer comfort and reassurance",
      "Spend quality time together"
    ],
    conversationStarters: [
      "How are you feeling right now?",
      "I'm here for you. What's on your mind?"
    ],
    activities: [
      "Talk about their interests",
      "Do something creative together",
      "Get some fresh air outside"
    ]
  };
}
