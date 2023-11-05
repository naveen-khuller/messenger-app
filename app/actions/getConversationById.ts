import prisma from '@/app/libs/prismaDb';
import getCurrentUser from "./getCurrentUser";


const getConversationById = async (ConversationId: string) => {
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser?.id) return null;

        const Conversation = await prisma.conversation.findUnique({
            where: {
                id: ConversationId
            },
            include: {users: true }
        });
        return Conversation;

    } catch (error: any){
        return null;
    }
};

export default getConversationById;