import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { get } from "http";


export default async function getSession() {
    return await getServerSession(authOptions);
}