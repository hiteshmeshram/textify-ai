"use client"

import { getPresignedUrlFromDigitalOcean } from '@/lib/getPresignedUrlFromDigitalOcean';
import { UploadurlToDb } from '@/lib/UploadurlToDb';
import {  Loader2, UploadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';

export const Upload = () => {
    const [uploading,setUploading] = useState(false);
    const router = useRouter();
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if(!file) {
            alert('upload file')
            return ;
        }
        const url = await getPresignedUrlFromDigitalOcean(file.name,file.type)
              if(!url) {
                alert('url not found')
                return ;
              }
        try {
            setUploading(true);
            const response = await fetch(url,{
                method: "put",
                body: file,
                headers: {
                    'Content-Type': file.type,
                    'x-amz-acl': 'public-read'
                }
            })
    
            if(response.ok) {
                
                const id = await UploadurlToDb(url,file.name);
                setUploading(false)
                router.push(`/chats/${id}`)
            } 
        } catch (error) {
            console.log(error)
        }
              
              
    },[])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return <div {...getRootProps()} className='text-neutral-400 mt-5 w-full h-[100px] bg-white  p-4 border border-dashed rounded-md text-black flex flex-col justify-center items-center'>
        <input {...getInputProps()} className='m-4  border  border-neutral-200 bg-red-200'/>
        {!uploading? <div className='flex flex-col justify-center items-center'>
            <UploadIcon/>
            <p>Upload files here!</p>
        </div> : <div>
                <Loader2/>
            </div>}
    </div>
} 