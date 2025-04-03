import { ChatComponent } from "@/components/ChatComponent";
import { PdfEmbeed } from "@/components/PdfEmbeed";
import { Sidebar } from "@/components/Sidebar";
import prisma from "@/lib/db";


async function getAllChats() {
    const chats = await prisma?.document.findMany({
        where: {
            userId: 1
        }
    })

    return chats;
}
 
export default async function({params}: {
    params: {chatId: string}
}) {

  const chats = await getAllChats()
  const chat = chats.filter((c)=>c.id === parseInt(params.chatId));

    return <div className="flex gap-10">
        <Sidebar chats={chats}/>
        <div className="flex-1 " >
            <PdfEmbeed url={chat[0].url}/>
        </div>
        <div className=" w-[500px]">
            <ChatComponent/>
        </div>
    </div>
}