
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";

interface User {
  id:string
  name: string
  email: string
  image: string
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "secret"
          })
          
      
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        //@ts-expect-error : not sure about types
        async signIn({user}: User) {
          console.log(user)
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email
            }
          })

          if(!existingUser) {
             await prisma.user.create({
              data: {
                email: user.email,
                name: user.name
              }
              
            })
          }

          return true;
        }
      }
    
}