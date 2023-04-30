import { OpenAI } from "langchain/llms/openai";
import { LLMChain, SimpleSequentialChain, SequentialChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

import * as dotenv from 'dotenv'
dotenv.config()

const model = new OpenAI({ temperature: 0 })

//Memory 
const memory = new BufferMemory()

// const res = await model.call('Tell me good name for my crockery company')
// console.log(res);

// promp template 
const title_template = new PromptTemplate({
    template: "Tell me a good name for my {title} company",
    inputVariables: ['title']
})

//Chain
const title_chain = new LLMChain({
    llm: model,
    prompt: title_template,
    verbose: true,
    outputKey: 'company_name',
    memory: memory
})

// const resA = await title_chain.run('Electronic') // will return text "TechEase Solutions"
// console.log(resA);

// const resB = await title_chain.call({ title: 'Socks' }) // will return obj { text: '\n\nSocktastic!' }
// console.log(resB);

//Chain multiple task together

const desc_template = new PromptTemplate({
    inputVariables: ['company_name'],
    template: 'Tell me short description for the given company name : {company_name}'
})

const desc_chain = new LLMChain({
    llm: model,
    prompt: desc_template,
    outputKey: 'desc',
    memory: memory
})

//SimpleSequentialChain is for multiple single-input/single output 
const simple_chain = new SimpleSequentialChain({
    chains: [title_chain, desc_chain],
    verbose: true
})

// const res = await simple_chain.run('Crockery')
// console.log(res);

// SequentialChain is for multiple chains that have more than one input or ouput keys

const seq_chain = new SequentialChain({
    chains: [title_chain, desc_chain],
    inputVariables: ['title'],
    outputVariables: ['company_name', 'desc']
})
// const res = await seq_chain.call({ title: 'Real State' })
// console.log(res.company_name);
// console.log(res.desc);
// console.log(res);

//Memory
// const loaded_mem = await memory.loadMemoryVariables({})
// console.log(loaded_mem);