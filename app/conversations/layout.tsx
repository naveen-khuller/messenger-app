import Sidebar from "../components/Sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import ConversationsList from "./components/ConversationsList";


export default async function ConversationsLayout({children}:{children:React.ReactNode}){
const conversations = await getConversations();
    return (
        <Sidebar>
           <div className="h-full">
              <ConversationsList initialItems={conversations}/>
             {children}
           </div>
        </Sidebar>
    )
}