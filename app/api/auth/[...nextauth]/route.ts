import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '../../../libs/prismaDb';


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProviders({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if(!credentials?.email || ! credentials?.password){
                    throw new Error('Invalid Credentials');
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid Credentials');
                }
                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isValid){
                    throw new Error('Invalid Credentials');
                }
                return user;
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    session: {
        strategy:"jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };