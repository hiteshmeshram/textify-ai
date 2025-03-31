import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export async function generateSmallChunks(text: string) {
    console.log(text);
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 1,
      });
      
      const output = await splitter.createDocuments([text]);
      return output;
}