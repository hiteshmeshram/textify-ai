
import { EmbedContentResponse } from '@google/genai';
import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_DATABASE_API_KEY ?? "",
  maxRetries: 5,
});

export async function storeEmbedingsToPinecone(id: string, embedings: EmbedContentResponse, str: string, fileName: string) {
  const values = embedings.embeddings![0].values;
  const index = pc.index('chat-pdf','https://chat-pdf-xdnfjv2.svc.aped-4627-b74a.pinecone.io' )

  await index.namespace(fileName).upsert([{
    id,
    values,
    metadata: {text: str}
  }]);
  
}