'use client'
import { EmbedUserMessageAndRespond } from "@/lib/EmbedUserMessageAndRespond"
import { getAllMessages } from "@/lib/getAllMessages"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface Message {
    id: number,
    documentId: number,
    role: 'user' | 'system',
    content: string
}

export const ChatComponent = ({chat}: {
    chat: {
        name: string;
        id: number;
        url: string;
        userId: number;
    }
}) => {
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState< Message[]>()

    const session = useSession();

        async function getData() {
            const messagesss = await getAllMessages(chat.id);
        
            if(!messagesss) return;
             setMessages(messagesss)
            
        }

        useEffect(()=> {
            getData();
          
        },[])

        async function handleClick() {
            const response = await EmbedUserMessageAndRespond(message , chat)
        }
        
    return <div className="mt-10 w-full mr-5 ">
            <div className="border border-neutral-400 rounded-xl shadow-2xl p-10 min-h-[50vh]">
            <h1 className=" text-xl font-semibold tracking-tighter text-center">chats</h1>
                <div className="flex flex-col gap-5 mt-5">
                    {messages?.map((message,index) => (
                            <div key={index} className={`p-2 border border-neutral-200 rounded-xl ${message.role === "user" ? 'flex justify-start' : 'flex justify-end'}`}>
                                {message.content}
                            </div> 
                    ))}
                </div>
            </div>
            <div className="flex mt-5 pb-15 ">
                <input 
                    onChange={(e)=> setMessage(e.target.value)}
                    type='text' 
                    className="border border-neutral-400 p-2 w-3/4 mr-4 rounded-full"></input>
                <button
                    onClick={handleClick} 
                    className="bg-purple-800 px-2 rounded-xl text-white">send</button>
            </div>
        
    </div>
}