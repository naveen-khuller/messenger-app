import prisma from '@/app/libs/prismaDb';

const getMessages = async (conversationId: string) => {

    try{

        const messages = await prisma.message.findMany({
            orderBy:{
                createdAt:'asc',
            },
            where:{
                conversationId: conversationId,
            },
            include:{
                sender:true,
                seenBy:true
            }
        });

        return messages;

    } catch(error: any){
        return [];
    }
};

export default getMessages;