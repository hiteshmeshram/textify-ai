"use client"

import { FileText, SidebarClose } from "lucide-react"
import { signOut } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { useState } from "react";



interface ChatsProps {
    id: number,
    name: string,
    userId: number,
    url: string
}
export const Sidebar = ({chats}: {
    chats: ChatsProps[]
}) => {
    const [isOpen,setIsOpen] = useState<Boolean>(true);
    const router = useRouter()
    const [selected,setSelected] = useState(0);

    return <div className={`relative border-r border-neutral-200 h-screen transition-all duration-300 ${isOpen ? "w-72" : "w-18"}`}>
        <div className="flex justify-between p-4">
            <h1 className="text-xl font-semibold tracking-tight">{isOpen && <button onClick={()=>router.push('/')} className=" px-2 py-1 bg-white shadow-2xl t">Add conversaion </button>} </h1>
            <button onClick={()=>setIsOpen(!isOpen)}><SidebarClose/></button>
            
        </div>
        <div className="p-5">
            {chats.map((chat,index) => (
                
                <ul key={chat.id}>
                    <li onClick={()=>{
                        setSelected(index);
                        router.push(`${chat.id}`);
                    } 
                
                    } className={`hover:cursor-pointer  flex gap-1  px-4  rounded-xl border border-neutral-200 my-4 p-2  hover:bg-gray-300 rounded ${selected === index ? "bg-blue-100" : "bg-white"}`}><FileText />{isOpen && chat.name}</li>
                </ul>
                
            ))}
        </div>
       {isOpen &&  <div className="absolute bottom-10 w-full flex justify-center">
            <button 
                onClick={()=>signOut({callbackUrl: "http://localhost:3000"})}
                className="px-15 py-2   rounded-xl bg-black text-white">Signout</button>
        </div>}
        </div>
}