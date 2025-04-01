
// import OpenAI from "openai";
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })

// export async function generateEmbedings(str: string) {
//     console.log('inside generae embedings' , str)
//     const embedding = await openai.embeddings.create({
//         model: "text-embedding-3-small",
//         input: str,
//         encoding_format: "float",
//       });

//       console.log(embedding, 'embedings is ')
//       return embedding;
// }

import { GoogleGenAI } from "@google/genai";

export async function generateEmbedings(str: string) {

    console.log('inside generate embedings')
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: str,
    });

    console.log('respoinse issssss')
    if(!response.embeddings) return null;
    console.log(response.embeddings[0].values);
    
    return response;
}