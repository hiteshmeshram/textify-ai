

import { GoogleGenAI } from "@google/genai";
import { storeEmbedingsToPinecone } from "./pinecone";

export async function generateEmbedings(str: string , fileName: string) {

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: str,
        config: {
            outputDimensionality: 1024
        }
    });

    if(!response.embeddings) return null;

    const chunkId = Math.floor((Math.random() * 100)).toString();


    await storeEmbedingsToPinecone(chunkId, response ,str, fileName);

}