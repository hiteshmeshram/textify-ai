"use client"

import { getPresignedUrlFromDigitalOcean } from '@/lib/getPresignedUrlFromDigitalOcean';
import { UploadurlToDb } from '@/lib/UploadurlToDb';
import { Router, UploadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';

export const Upload = () => {
    const router = useRouter();
    const onDrop = useCallback(async (acceptedFiles: any) => {
        const file = acceptedFiles[0];
        console.log('inside drop')
        if(!file) {
            alert('upload file')
            return ;
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
                    const id = await UploadurlToDb(url,file.name);
                    router.push(`chats/${id}`)
                }
              
    },[])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return <div {...getRootProps()} className='mt-5 w-full h-[100px] border border-dotted rounded-md text-black flex flex-col justify-center items-center'>
        <input {...getInputProps()} className='p-2 border border-neutral-200 bg-red-200'/>
        <UploadIcon/>
        <p>Upload files here!</p>
    </div>
}