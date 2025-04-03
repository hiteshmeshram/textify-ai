import { Chats } from "@/components/Chats"
import { PdfEmbeed } from "@/components/PdfEmbeed"
import { Sidebar } from "@/components/Sidebar"

export const Home = () => {
    return <div className="grid grid-cols-12">
        <div className="col-span-3">
            <Sidebar/>
        </div>
        <div className="col-span-6">
            <PdfEmbeed/>
        </div>
        <div className="col-span-3">
            <Chats/>
        </div>
    </div>
}