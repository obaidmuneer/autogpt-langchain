import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import * as dotenv from 'dotenv'
dotenv.config()

const model = new OpenAI({ temperature: 0 })

// const res = await model.call('Tell me good name for my crockery company')
// console.log(res);

// promp template 
const title_template = new PromptTemplate({
    template: "Tell me good name for my {title} company",
    inputVariables: ['title']
})
const title_chain = new LLMChain({
    llm: model,
    prompt: title_template,
    verbose: true
})

// const resA = await title_chain.run('Electronic') // will return text "TechEase Solutions"
// console.log(resA);

// const resB = await title_chain.call({ title: 'Socks' }) // will return obj { text: '\n\nSocktastic!' }
// console.log(resB);
