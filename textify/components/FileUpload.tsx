'use client'

import { useState } from "react";
import axios from 'axios'
import { getPresignedUrlFromDigitalOcean } from "@/lib/getPresignedUrlFromDigitalOcean";
import { UploadurlToDb } from "@/lib/UploadurlToDb";

export const FileUpload = () => {
    const [file,setFile ] = useState<null | File>();

    async function handleFile(e: any) {
        setFile(e.target.files[0]);
    }

    async function handleUpload() {
        if(!file) {
            alert('please add pdf');  
            return;
        }
        
      const url = await getPresignedUrlFromDigitalOcean(file.name,file.type)
      if(!url) {
        alert('url not found')
        return ;
      }

        const response = await fetch(url,{
            method: "put",
            body: file,
            headers: {
                'Content-Type': file.type,
                'x-amz-acl': 'public-read'
            }
        })

        if(response.ok) {
            alert('uploaded successfully')
            await UploadurlToDb(url,file.name);
        }
      }

    return <div className="w-full bg-red-100 border rounded-xl mt-4 flex flex-col justify-center items-center ">
        <div>
            <input onChange={handleFile} 
            type='file' 
            className="w-full  "  
            accept="application/pdf"></input>
        </div>
        <button className="bg-black text-white px-4 py-1 rounded-lg mt-5" onClick={handleUpload}>Uplaod</button>
        {/* <div className="flex-col justify-center bg-red-100 ">
        <FileUp />
        <p>Drop PDF Here</p>
        </div> */}
    </div>
}