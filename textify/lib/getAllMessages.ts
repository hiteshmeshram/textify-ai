"use server"

export async function getAllMessages() {
    const messages = await prisma?.message.findMany({
        where: {
            documentId: 24
        },
        take: 10,
        
    })
    console.log(messages)
    return messages;
}