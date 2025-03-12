'use client'

import { AddUrl } from "@/components/AddUrl";
import { FileUpload } from "@/components/FileUpload";
import { useRouter } from "next/navigation";

export default function() {
  const router = useRouter()
  return <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen flex justify-center ">
    <div className="mt-24 min-w-md ">
      <FileUpload/>
      <AddUrl/>
      <div className="mt-24">
        <iframe onClick={()=>{
          console.log('clieked')
          router.push('/chats')
        }} className="border-hidden " src="https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf"></iframe>
        
      </div>
    </div>
    
  </div>
}