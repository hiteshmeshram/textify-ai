'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./Button"

export const Appbar = () => {
    const session = useSession();
    
    return <div className="flex  justify-end items-center">
         <div>
            <button className="border border-black font-semibold px-4 py-2 rounded-xl">Textify Pro</button>
        </div>
        <div>
        {session?.data?.user ? <Button onClick={()=>{
            signOut()
            
        } }className=" bg-black text-white text-semibold px-4 py-2 m-4 rounded-xl">Signout</Button> : <Button onClick={()=> {
            signIn();
            }} className=" bg-black text-white text-semibold px-4 py-2 m-4 rounded-xl">signin</Button>}
        </div>
       
        

    </div>
}