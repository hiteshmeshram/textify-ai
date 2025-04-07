
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import prisma from "./db";
import { userAgent } from "next/server";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "secret"
          })
          
        // ...add more providers here
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async jwt({user,token}: any) {
          if(user) {
            token.uid = user.id;
          }
    
          return token;
        },
        async session({session,token,user}: any) {
         
          if(session.user) {
            session.user.id = token.uid;
          }
          return session
        },
        async signIn({user,account,profile}: any) {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email
            }
          })

          if(!existingUser) {
            const newUser = await prisma.user.create({
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