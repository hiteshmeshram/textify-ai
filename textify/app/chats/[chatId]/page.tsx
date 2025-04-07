import { ChatComponent } from "@/components/ChatComponent";
import { PdfEmbeed } from "@/components/PdfEmbeed";
import { Sidebar } from "@/components/Sidebar";
import prisma from "@/lib/db";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";

async function getAllChats() {
    const session = await getServerSession(authOptions)
    
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    if(!user) return;
    const chats = await prisma?.document.findMany({
        where: {
            userId: user.id
        }
    })

    return chats;
}
 interface PageProps {
    params: Promise<{
        chatId: string
    }>
 }
export default async function ChatPage({params}: PageProps) {
    
    const chatId = (await params).chatId;
    const chats = await getAllChats();
    if(!chats) return;
    const chat = chats.find((c)=>c.id === parseInt(chatId));
    if(!chat) return;

    return <div className="flex gap-10 mx-2">
        <Sidebar chats={chats}/>
        <div className="flex-1 " >
            <PdfEmbeed url={chat.url}/>
        </div>
        <div className=" w-[500px]">
            <ChatComponent chat={chat}/>
        </div>
    </div>
}