import getUsers from "../actions/getUsers";
import UserList from "./Components/UserList";
import Sidebar from "../components/Sidebar/Sidebar";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
    const users = await getUsers();
    console.log('users',users);
    return (
        <Sidebar>
        <div className="h-full">
            <UserList items={users}/>
            {children}
        </div>
        </Sidebar>
    )
}