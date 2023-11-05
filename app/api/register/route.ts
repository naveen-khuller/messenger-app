import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismaDb'

export async function POST(request: Request){
    try{
    const body = await request.json();
    const {email, name, password} = body;
    if(!email || !name || !password){
        return new NextResponse('Missing Info', {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });
    return new NextResponse(JSON.stringify(user), {status: 201});
    }catch(err:any){
        console.log('REGISTRATION_ERROR', err);
        return new NextResponse(err.message, {status: 500});
    }

}