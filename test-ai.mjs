import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { config } from 'dotenv';

config(); // Load your .env

async function test() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: GOOGLE_GENERATIVE_AI_API_KEY is missing in .env');
    return;
  }

  try {
    const { text } = await generateText({
      // 🚀 Use Gemini 2.5 Flash - The current stable standard
      model: google('gemini-2.5-flash'), 
      prompt: 'What is the color of a rotten apple?',
    });
    console.log('✅ Success:', text);
  } catch (e) {
    // If you still get a quota error, try 'gemini-2.5-flash-lite'
    console.error('💥 Error:', e.message);
    console.log('\n💡 Tip: If you see "Limit 0", go to AI Studio and ensure "Free Tier" is enabled for your project.');
  }
}

test();