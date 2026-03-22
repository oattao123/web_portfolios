import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const typhoon = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.opentyphoon.ai/v1',
});

async function main() {
    try {
        const result = await streamText({
            model: typhoon.chat('typhoon-v2.5-30b-a3b-instruct'),
            system: "You are a helpful assistant.",
            messages: [{ role: 'user', content: 'Say hello!' }],
            maxRetries: 1,
            maxOutputTokens: 2048,
        });

        for await (const textPart of result.textStream) {
            process.stdout.write(textPart);
        }
        console.log("\n[Done]");
    } catch (e) {
        console.error("ERROR:", e);
    }
}
main();
