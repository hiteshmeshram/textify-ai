"use client"

import { Plus, SidebarClose } from "lucide-react"
import { useRouter } from "next/navigation";
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
    const [isOpen,setIsOpen] = useState<Boolean>(false);
    const router = useRouter()

    return <div className={`border-r border-neutral-200 h-screen transition-all duration-300 ${isOpen ? "w-60" : "w-18"}`}>
        <div className="flex justify-between p-4">
            <h1 className="text-xl font-semibold tracking-tight">{isOpen && <button className=" px-2 py-1 bg-white shadow-2xl t">Add conversaion </button>} </h1>
            <button onClick={()=>setIsOpen(!isOpen)}><SidebarClose/></button>
            
        </div>
        <div className="p-5">
            {chats.map((chat) => (
                
                <ul key={chat.id}>
                    <li onClick={()=> router.push(`${chat.id}`)} className="hover:cursor-pointer  px-4  rounded-xl border border-neutral-200 my-4 p-2 bg-gray-200 hover:bg-gray-300 rounded">{isOpen && chat.name}</li>
                </ul>
                
            ))}
        </div>
        </div>
}