import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { SerpAPI } from "langchain/tools";
import { pull} from "langchain/hub";
import {Calculator} from "langchain/tools/calculator";
import dotenv from 'dotenv';
import { ChatPromptTemplate } from "@langchain/core/prompts";
dotenv.config();
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
const tools = [new TavilySearchResults({ maxResults: 1 })];

const prompt = await pull<ChatPromptTemplate>(
    "hwchase17/openai-functions-agent"
  );

// const tools = [new Calculator(), new SerpAPI()];

const llm = new ChatOpenAI({modelName: "gpt-3.5-turbo-1106",
    temperature: 0});

const agent = await createOpenAIFunctionsAgent(
    llm,
    tools
);

const agentExecutor = new AgentExecutor({
    agent,
    tools,
});
  
const result = await agentExecutor.invoke({
    input: "Tell me latest java developer jobs posted within time span of last week",
});

console.log(result);
