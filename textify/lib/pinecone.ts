
import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_DATABASE_API_KEY ?? "",
  maxRetries: 5,
});

export async function storeEmbedingsToPinecone(id: string, embedings: any, str: string) {
  console.log('inside store embedings function')
  const values = embedings.embeddings[0].values;
  const index = pc.index('chat-pdf','https://chat-pdf-xdnfjv2.svc.aped-4627-b74a.pinecone.io' )

  await index.namespace('hitesh').upsert([{
    id,
    values,
    metadata: {text: str}
  }]);
  console.log('embedings inserted');
  
}