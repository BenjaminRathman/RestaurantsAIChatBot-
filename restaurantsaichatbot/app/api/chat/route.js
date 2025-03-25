import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST handler for chat messages
 * Processes user messages and returns AI responses using OpenAI's GPT model
 */
export async function POST(req) {
  try {
    // Extract message and menu data from request body
    const { message, menu } = await req.json();

    // Create a prompt that includes the menu information and user's message
    const prompt = `You are a helpful restaurant assistant. Here is our menu:
${JSON.stringify(menu, null, 2)}

Customer message: ${message}

Please respond in a friendly, helpful manner. If they're asking about the menu, provide relevant information and make recommendations. If they're placing an order, confirm their order and suggest complementary items. Keep responses concise and natural.`;

    // Call OpenAI API to generate response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful restaurant assistant that helps customers with their orders and provides menu information."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7, // Controls response randomness (0.0 = deterministic, 1.0 = creative)
      max_tokens: 500,  // Maximum length of the response
    });

    // Return the AI's response
    return NextResponse.json({ 
      message: completion.choices[0].message.content 
    });
  } catch (error) {
    // Log error and return error response
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 