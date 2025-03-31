"use server"

import {prisma} from "./db"
import axios from 'axios'
import pdfParse from "pdf-parse"
import { generateSmallChunks } from "./generateSmallChunks";
import { generateEmbedingsAndStoreToPinecondeDb } from "./generateEmbedingsAndStoreToPinecondeDb";

export async function UploadurlToDb(url: string) {
    const do_pdf_url = url.split('?')[0];
    const name = do_pdf_url.split('com/')[1];
    console.log(do_pdf_url, 'url pdf uploadedddd')

    await prisma.document.create({
        data: {
            name,
            url: do_pdf_url,
            userId: 1
        }
    });

    const response = await axios.get(do_pdf_url, {
        responseType: "arraybuffer"
    })

    const pdfData = await pdfParse(response.data);
    const text  = pdfData.text;

    const dataChunks = await generateSmallChunks(text);

    await generateEmbedingsAndStoreToPinecondeDb(dataChunks);

}