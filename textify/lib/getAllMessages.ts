"use server"
import prisma from './db'

export async function getAllMessages(chatId: number) {
    const messages = await prisma?.message.findMany({
        where: {
            documentId: chatId
        }
        
        
    })
    return messages;
}