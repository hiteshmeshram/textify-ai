"use client"
import { useState } from "react"
import * as pdfjsLib from "pdfjs-dist/webpack";
import { generateEmbedings } from "../utils/embedings";

const getDocuments = async (text: any, chunkSize = 512) => {
    const words = text.split(" "); // Split by words
    const chunks = [];
  
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(" "));
    }
  
    return chunks;
  };

export default function() {
    const [file,setFile ] = useState("")
    const [document,setDocument ] = useState<any>([])
    
    const[pdfText,setPdfText ] = useState('')
    
    const extractTextFromPDF = async (arrayBuffer: any) => {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
    
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(" ") + "\n"; // Extract text
        }
    
        setPdfText(text);
        const documents = await getDocuments(text, 512)
        console.log(documents)
        setDocument(documents)
        generateEmbedings(documents)
        console.log('small documents')
        
      };

      
 
    async function handleFileChange(e: any ) {
        
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const buffer = e.target!.result;
            console.log('insinde buffer')
            console.log(buffer)

            extractTextFromPDF(buffer)
        }

        
    
    }

    return <div className="flex justify-center mt-32">  
        <input onChange={handleFileChange} className="border" type="file"></input>
        <iframe src="https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf"></iframe>
        {pdfText}
    </div>
}