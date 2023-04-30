import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import * as dotenv from 'dotenv'
dotenv.config()

const llm = new OpenAI({ temperature: 0 })

const res = await llm.call('Tell me good name for my crockery company')
console.log(res);