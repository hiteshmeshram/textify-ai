'use server'

import { GoogleGenAI } from "@google/genai";
import { Pinecone, RecordMetadata, ScoredPineconeRecord } from "@pinecone-database/pinecone";
import prisma from "./db";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
const pc = new Pinecone({ apiKey: process.env.PINECONE_DATABASE_API_KEY ?? "" })

type Chat = {
    name: string;
    id: number;
    url: string;
    userId: number
}
export async function EmbedUserMessageAndRespond(message: string , chat: Chat) {
 
  const embeding = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07',
        contents: message,
        config: {
            outputDimensionality: 1024
        }
      });

      if(!embeding.embeddings) return null;

      const queryResponse = await queryPinecone(embeding.embeddings[0].values! ,chat.name)
      const a = queryResponse.matches
      console.log(a)
    
      
      const response = await sendToAi(message , queryResponse.matches )
      if(!response) return null;
      
      const text = response.parts![0].text 

      await prisma.message.create({
        data: {
          documentId: chat.id,
          role: "user",
          content: message
        }
      })

      await prisma.message.create({
       data: {
          documentId: chat.id,
          role: "system",
          content: text ?? ""
          
          
        }
      })
     
    return;
}

async function queryPinecone(embeding: number[] , chatName: string) {

  const index = pc.index('chat-pdf','https://chat-pdf-xdnfjv2.svc.aped-4627-b74a.pinecone.io' )

  const queryResponse = await index.namespace(chatName).query({
    vector: embeding,
    topK: 3,
    includeValues: false,
    includeMetadata: true,
  });

  return queryResponse;
}

async function sendToAi(message: string, arrayOfQueryResponse:  ScoredPineconeRecord<RecordMetadata>[]) {
  console.log('arraayof queryRespoinse')
  console.log(arrayOfQueryResponse)

    const formatedResponse = arrayOfQueryResponse.map((r)=> {return r.metadata!.text})
 
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
      
      return response.candidates![0].content

      

}