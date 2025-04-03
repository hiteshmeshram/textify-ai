'use client'
import { EmbedUserMessageAndRespond } from "@/lib/EmbedUserMessageAndRespond"
import { getAllMessages } from "@/lib/getAllMessages"
import { useEffect, useState } from "react"

interface Message {
    id: number,
    documentId: number,
    role: 'user' | 'system',
    content: string
}

export const ChatComponent = () => {
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState< Message[]>()

        async function getData() {
            const messagesss = await getAllMessages();
            console.log(messagesss)
            if(!messagesss) return;
             setMessages(messagesss)
            
        }

        useEffect(()=> {
            getData();
          
        },[])

        async function handleClick() {
            console.log('inside handleclick')
            const response = await EmbedUserMessageAndRespond(message , '2')

            //@ts-ignore
            console.log(response[0].text)
            // @ts-ignore
            // const m = response?.parts[0].text;
            // setMessages(m => [...m,{role: 'system', content: m as unknown as  string}])
        }
        
    return <div className="p-5 w-full  ">
            <h1 className="mt-5 text-xl font-semibold tracking-tighter">chats</h1>
            <div className="flex flex-col gap-5 mt-5">
                {messages?.map((message,index) => (
                        <div key={index} className={`p-2 border ${message.role === "user" ? 'flex justify-start' : 'flex justify-end'}`}>
                            {message.content}
                        </div> 
                ))}
            </div>
            <div className="flex mt-5 pb-15 ">
                <input 
                    onChange={(e)=> setMessage(e.target.value)}
                    type='text' 
                    className="border border-neutral-400 p-2 w-3/4 mr-4 rounded-md"></input>
                <button
                    onClick={handleClick} 
                    className="bg-blue-500 px-2 rounded-md">send</button>
            </div>
        
    </div>
}