import OpenAI from 'openai';
const openai = new OpenAI({
  organization: 'org-2fKRnFLyUuAnXvj7v2MHareF',
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
  });

  console.log(response.choices);
}

main();