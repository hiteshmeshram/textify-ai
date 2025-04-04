'use server'

import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";
import prisma from "./db";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
const pc = new Pinecone({ apiKey: process.env.PINECONE_DATABASE_API_KEY ?? "" })

export async function EmbedUserMessageAndRespond(message: string , chatId: string) {
  // const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

      //generate embedings and search for the top 5 embedings in pineconde db
      const embeding = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: message,
        config: {
            outputDimensionality: 1024
        }
      });

      if(!embeding.embeddings) return null;

      //user message with pineconde db returned messages send to ai

      const queryResponse = await queryPinecone(embeding.embeddings[0].values)
      console.log(queryResponse.matches)

      // return response.text;
    
      const response = await sendToAi(message , queryResponse.matches)
      if(!response) return null;

      //@ts-ignore
      const text = response.parts[0].text 

      await prisma.message.create({
        data: {
          documentId: 24,
          role: "user",
          content: message
        }
      })

      //here store it in db
      await prisma.message.create({
       data: {
          documentId: 24,
          role: "system",
          content: text ?? ""
          
          
        }
      })
      // return response;

      // await storeInDatabase(response)
    
}

async function queryPinecone(embeding: any) {

  // const pc = new Pinecone({ apiKey: process.env.PINECONE_DATABASE_API_KEY ?? "" })

  const index = pc.index('chat-pdf','https://chat-pdf-xdnfjv2.svc.aped-4627-b74a.pinecone.io' )

  const queryResponse = await index.namespace('hitesh').query({
    vector: embeding,
    topK: 3,
    includeValues: false,
    includeMetadata: true,
  });

  return queryResponse;
}

type ArrayOfqueryResponse = {
      id: string,
      score: number,
      values: any,
      sparseValues: string,
      metadata: any
}

async function sendToAi(message: string, arrayOfQueryResponse: any) {
  // const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const formatedResponse = arrayOfQueryResponse.map((r: any)=> {return r.metadata.text})
    console.log('inside sendto ai funn');
    console.log(formatedResponse)

    const prompt = `
      You are an AI assistant. Answer the user's question based on the retrieved context.

      Context:
      ${formatedResponse}

      User's Query:
      ${message}

      Answer:
      `;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{role: 'user', parts: [{text: prompt}]}],
      });
      if(!response ) return null;
      //@ts-ignore
      console.log(response.candidates[0].content);
      //@ts-ignore
      return response.candidates[0].content

      

}