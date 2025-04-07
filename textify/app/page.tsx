

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { ImageComponent } from "@/components/ImageComponent";
import { SubHeading } from "@/components/SubHeading";
import { CloudUpload,  } from "lucide-react";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";
import { signIn, useSession } from "next-auth/react";
import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options";
import { redirect } from 'next/navigation'
import { Upload } from "@/components/Upload";

export default async function Home() {
  const session = await getServerSession(authOptions)
  

  // if(session?.user) {
  //   return redirect('/chats/5')
  // }

  return (
   <div className="bg-gradient-to-r from-rose-100 to-teal-100 min-h-screen w-full flex flex-col items-center justify-center ">
    <div className="w-full justify-end">
      <Appbar/>
     
    </div>
      <div className="mt-10 max-w-4xl ">
        <Heading/>
        <div className="mt-5 flex justify-center">  
          <Button  className="bg-black text-white rounded-lg px-4 py-2 mr-2 text-sm" >
            Get Started
          </Button>
          <Button className="text-black bg-white rounded-lg px-4 py-2 text-sm ">
            Manage Subscriptions
          </Button>
        </div>
        <SubHeading/>
        { session && <Upload/>}
        <ImageComponent/>
      </div>
   </div>
  );
}
