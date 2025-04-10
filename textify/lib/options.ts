
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "secret"
          })
          
      
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async signIn({user}) {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email!
            }
          })

          if(!existingUser) {
             await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name!
              }
              
            })
          }

          return true;
        }
      }
    
}