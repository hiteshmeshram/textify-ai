"use server"

export async function getAllMessages(chatId: number) {
    const messages = await prisma?.message.findMany({
        where: {
            documentId: chatId
        },
        take: 10,
        
    })
    return messages;
}