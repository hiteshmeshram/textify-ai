"use server"

import {prisma} from "./db"
import axios from 'axios'
import pdfParse from 'pdf-parse'
import { generateSmallChunks } from "./generateSmallChunks";
import { generateEmbedingsAndStoreToPinecondeDb } from "./generateEmbedingsAndStoreToPinecondeDb";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import fs from 'fs'
import path from "path";
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist'
import { PDFDocument } from 'pdf-lib';
import { RecursiveCharacterTextSplitter, TextSplitter } from "langchain/text_splitter";
import { generateEmbedings } from "./generateEmbedings";
const pdf = require("pdf-parse-fork");

export async function UploadurlToDb(url: string, fileName: string) {
    console.log('inside upload to db')
    const do_pdf_url = `https://hitesh.blr1.digitaloceanspaces.com/${fileName}`;
    const name = fileName;

    // await prisma.document.create({
    //     data: {
    //         name,
    //         url: do_pdf_url,
    //         userId: 1
    //     }
    // });

    const response = await axios.get(do_pdf_url, {
        responseType: "arraybuffer"
    })

    pdf(response.data).then(function(data: any) {
        createSmallChunks(data.text);
        
    })

}

async function createSmallChunks(text: any) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 128,
        chunkOverlap: 1,
        });
        
        const output = await splitter.createDocuments([text]);
        console.log(output[0])
        
        // return output;
        //here create embedings and store it in pineconedb
        const res = await generateEmbedings(output[0].pageContent);

        //store it in pineconedb


}