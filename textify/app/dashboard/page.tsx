'use client'

import { AddUrl } from "@/components/AddUrl";
import { Appbar } from "@/components/Appbar";
import { FileUpload } from "@/components/FileUpload";
import { useRouter } from "next/navigation";

export default function() {
  const router = useRouter()
  return <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen flex justify-center ">
    <Appbar/>
    <div className="mt-24 min-w-md ">
      <FileUpload/>
      <AddUrl/>
      {/* <div className="mt-24">
        <iframe onClick={()=>{
          console.log('clieked')
          router.push('/chats')
        }} className="border-hidden " src="https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf"></iframe>
        
      </div> */}
      <div className="bg-red-100 mt-10">
        <button onClick={()=> {
          router.push('/chats')
        }} className="px-8 py-1 bg-black text-white  rounded-xl">Start chat</button>
      </div>
    </div>
    
  </div>
}