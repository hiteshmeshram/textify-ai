'use client'
import { useState } from "react"

export const ChatComponent = () => {

    interface Message {
        role: 'user' | 'system',
        content: string
    }
    const [messages,setMessages] = useState< Message[]>([
        {
            role: 'user',
            content: 'hiii'
        },
        {
            role: 'system',
            content: 'whats up! how may i help you'
        },{
            role: 'user',
            content: 'what is the name of pdf'
        },
        {
            role: 'system',
            content: 'name of pdf is strawberrry vanilla pancakes'
        },{
            role: 'user',
            content: 'thanks for the info'
        }])
        
    return <div className="p-5 w-full  ">
            <h1 className="mt-5 text-xl font-semibold tracking-tighter">chats</h1>
            <div className="">
                {messages?.map((message) =>{
                    return <div className=" ">
                        <div className={`p-4   ${message.role === "user" ? 'flex justify-start' : 'flex justify-end'}`}>
                            {message.content}
                        </div> 
                    </div>
                })}
            </div>
            <div className="flex mt-5  pb-15 ">
                <input type='text' className="border border-neutral-400 p-2 w-3/4 mr-4 rounded-md"></input>
                <button className="bg-blue-500 px-2 rounded-md">send</button>
            </div>
        
    </div>
}