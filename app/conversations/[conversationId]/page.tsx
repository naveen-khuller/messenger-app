import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/Emptystate";
import ConversationBody from "./components/ConversationBody";
import ConversationHeader from "./components/ConversationHeader";
import getConversationById from "@/app/actions/getConversationById";

interface IParams {
    conversationId: string
};

const conversationId = async({params}:{params:IParams}) => {

    const messages = await getMessages(params.conversationId);
    const conversation = await getConversationById(params.conversationId);

    if(!conversation) return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyState />
            </div>
        </div>
    );

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
               <ConversationHeader conversation={conversation}/>
               <ConversationBody />
            </div>
        </div>
    )
};

export default conversationId;