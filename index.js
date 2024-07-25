// import { ChatAnthropic } from "@langchain/anthropic";
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// const model = new ChatAnthropic({
//   model: "claude-3-5-sonnet-20240620",
//   temperature: 0
// });

// const messages = [
//   new SystemMessage("Translate the following from English into Italian"),
//   new HumanMessage("hi!"),
// ];
    
// await model.invoke(messages);

import "dotenv/config";
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatFireworks({
  model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
  temperature: 0
});

const userInput = process.argv[2] || "hi!";
const languageChosen = process.argv[3] || "Italian";

const messages = [
  new SystemMessage(`Translate the following from English into ${languageChosen}`),
  new HumanMessage(userInput),
];

const parser = new StringOutputParser();

async function main() {
  const result = await model.invoke(messages);

  const chain = model.pipe(parser);

  await chain.invoke(messages);

  await parser.invoke(result);

  console.log(result.content);
}

main().catch(console.error);