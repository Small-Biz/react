import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";


export default async function SetupLayout({
    children
}:{
    children: React.ReactNode;
}){
    const {userId} = auth();

    console.log('prepare to enquire store: ');

    if (!userId){
        redirect('/sign-in');
    }

    

    const response = await axios.get('http://localhost:8090/admin/store');
    const store = response.data.store;

    if (store){
        redirect('/'+store.id);
    }

    return(
        <>
            {children}
        </>
    );
}