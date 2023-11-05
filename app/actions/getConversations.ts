import primsa from "@/app/libs/prismaDb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return [];

    try {
        const conversations = await primsa.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true, messages: {
                    include: {
                        sender: true,
                        seenBy: true
                    }
                }
            }
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
}

export default getConversations;