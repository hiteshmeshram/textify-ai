'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./Button"
import { useRouter } from "next/navigation";

export const Appbar = () => {
    const session = useSession();
    const router = useRouter()
    return <div className="">
        {session?.data?.user ? <Button onClick={()=>{
            signOut()
            
        } }className="absolute top-0 right-0 bg-black text-white text-semibold px-4 py-2 m-4 rounded-xl">signout</Button> : <Button onClick={()=> {
            signIn();
            }} className="absolute top-0 right-0 bg-black text-white text-semibold px-4 py-2 m-4 rounded-xl">signin</Button>}
        

    </div>
}