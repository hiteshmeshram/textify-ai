
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { ImageComponent } from "@/components/ImageComponent";
import { SubHeading } from "@/components/SubHeading";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

export default function Home() {
  return (
   <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-screen flex justify-center ">
      <div className="mt-20 max-w-4xl ">
        <Heading/>

        <div className="mt-3 flex justify-center">  
          <Button  className="bg-black text-white rounded-lg px-4 py-2 mr-2 text-sm" >
            Go to chats
          </Button>
          <Button className="text-black bg-white rounded-lg px-4 py-2 text-sm">
            Manage Subscriptions
          </Button>
        </div>
        <SubHeading/>

        <FileUpload/>
        
        <ImageComponent/>
      </div>
   </div>
  );
}
