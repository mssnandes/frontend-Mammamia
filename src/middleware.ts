import { NextRequest, NextResponse } from "next/server";
import { getCookieClient } from "@/lib/cookieClient";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if(pathname.startsWith('/_next') || pathname === "/"){
        return NextResponse.next();
    }

    const token = await getCookieServer();

    if(pathname.startsWith('/dashboard')){
        if(!token){
            return NextResponse.redirect(new URL('/', req.url));
        }
        console.log('Token encontrado no middleware.');
        const isValid = await validadeToken(token);
        
        if(!isValid){
            return NextResponse.redirect(new URL('/', req.url));
        }
        console.log('Token válido no middleware.');
    }

    return NextResponse.next();
}

async function validadeToken(token: string){
    if(!token){
        return false;
    }

    try {
        await api.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true;

    } catch (error) {
        console.log('Erro ao validar token:', error);
        return false;
    }
}