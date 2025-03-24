'use client'
import { createEmbedsandStoreindb } from "@/utils/createEmbedsandStoreindb";
import { FileUp } from "lucide-react";
import { useState } from "react";
import AWS from 'aws-sdk'


export const FileUpload = () => {
    const [file,setFile ] = useState<any>();
    console.log(process.env.NEXT_PUBLIC_DIGITAL_OCEAN_ACCESS_KEY)
    console.log('access key')
    

    async function handleFile(e: any) {
        setFile(e.target.files[0]);
        

        // await createEmbedsandStoreindb(file)
    }

    async function handleUpload() {
        if(!file) {
            alert('please add pdf');
            
            return;
        }

        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_ACCESS_KEY, // Replace with your access key ID
            secretAccessKey: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_SECRET_KEY, // Replace with your secret access key
            region: 'blr1' // Replace with your region // Replace with your endpoint
          })

          const s3 = new AWS.S3({
             endpoint: 'https://blr1.digitaloceanspaces.com'
          });

          try {
            const param = {
                Bucket: 'muzer-assets', // Replace with your space name
                Key: file.name, // Use the original file name
                Body: file,
                ContentType: 'application/pdf', // Set the content type
                ACL: 'public-read', // Optional: Set access control
            }

            const uploadResult = await s3.upload(param).promise();
            console.log(uploadResult);
            alert('file uploaded')
          } catch (error) {
            console.error(error);
          }
    }

    return <div className="w-full bg-red-100 border rounded-xl mt-4 flex flex-col justify-center items-center ">
        <div>
            <input onChange={handleFile} type='file' className="w-full  "  accept="applicatin/pdf"></input>
        </div>
        <button className="bg-black text-white px-4 py-1 rounded-lg mt-5" onClick={handleUpload}>Uplaod</button>
        {/* <div className="flex-col justify-center bg-red-100 ">
        <FileUp />
        <p>Drop PDF Here</p>
        </div> */}
    </div>
}