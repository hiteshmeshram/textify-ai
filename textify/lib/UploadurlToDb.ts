"use server"

import prisma from "./db"
import axios from 'axios'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { generateEmbedings } from "./generateEmbedings";

// const pdf = require("pdf-parse-fork");
//@ts-expect-error : pdf parse has no types
import pdf from 'pdf-parse-fork'

export async function UploadurlToDb(url: string, fileName: string) {
    const do_pdf_url = `https://hitesh.blr1.digitaloceanspaces.com/${fileName}`;
    const name = fileName;

    const document = await prisma.document.create({
        data: {
            name,
            url: do_pdf_url,
            userId: 1
        }
    });

    try {
        const response = await axios.get(do_pdf_url, {
            responseType: "arraybuffer"
        })
    
        const data = await pdf(response.data);
        await createSmallChunks(data.text , fileName);

    } catch (error) {
        console.log(error);
    }

    return document.id;
}

async function createSmallChunks(text: string , fileName: string) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 1,
        });
        
        const output = await splitter.createDocuments([text]);
       
        await Promise.all(
            output.map(async (chunk) => {
                try {
                   await generateEmbedings(chunk.pageContent, fileName);
                } catch (error) {
                    console.log(error)
                }

            }
            )
        )

}