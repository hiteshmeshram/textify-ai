"use client"

import { SidebarClose } from "lucide-react"
import { useState } from "react";

const items = [
    {
        name: "hitesh Resume"
    },
    {
        name: " Riku Resume"
    },
    {
        name: "jakes Resume"
    }
]
export const Sidebar = () => {
    const [isOpen,setIsOpen] = useState<Boolean>(false);

    return <div className={`border-r border-neutral-200 h-screen transition-all duration-300 ${isOpen ? "w-60" : "w-18"}`}>
        <div className="flex justify-between p-4">
            <h1 className="text-xl font-semibold tracking-tight">{isOpen && "Conversation"} </h1>
            <button onClick={()=>setIsOpen(!isOpen)}><SidebarClose/></button>
            
        </div>
        <div className="p-5">
            {items.map((item) => (
                
                <ul className="">
                    <li className="px-4  rounded-md border border-neutral-200 my-4 p-2 bg-gray-200 hover:bg-gray-300 rounded">{isOpen && item.name}</li>
                </ul>
                
            ))}
        </div>
        </div>
}