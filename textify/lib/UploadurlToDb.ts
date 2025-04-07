"use server"

import {prisma} from "./db"
import axios from 'axios'
import { generateSmallChunks } from "./generateSmallChunks";
import { generateEmbedingsAndStoreToPinecondeDb } from "./generateEmbedingsAndStoreToPinecondeDb";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { RecursiveCharacterTextSplitter, TextSplitter } from "langchain/text_splitter";
import { generateEmbedings } from "./generateEmbedings";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { storeEmbedingsToPinecone } from "./pinecone";
const pdf = require("pdf-parse-fork");

export async function UploadurlToDb(url: string, fileName: string) {
    const session = getServerSession(authOptions);
    console.log('inside upload to db')
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

async function createSmallChunks(text: any , fileName: string) {
    console.log('inside create small chunk');
    console.log(text);
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 1,
        });
        
        const output = await splitter.createDocuments([text]);
        console.log(output[0])
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