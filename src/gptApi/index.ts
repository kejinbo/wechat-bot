import OpenAI from 'openai';
const openai = new OpenAI({
  organization: 'org-2fKRnFLyUuAnXvj7v2MHareF',
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);
}

main();

// import { ChatGPTAPI } from "chatgpt";

// async function test() {
//   // const key = process.env.OPENAI_API_KEY as string;
//   // console.log(key);
//   const api = new ChatGPTAPI({
//     apiKey: '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',
//   });

//   const res = await api.sendMessage('你是？');
//   console.log(res, res.text);
// }
// test();