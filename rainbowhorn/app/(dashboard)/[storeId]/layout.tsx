import {auth} from "@clerk/nextjs";
import axios from "axios";
import {redirect} from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}:{
    children: React.ReactNode;
    params:{storeId:string}
    }){
    
    const {userId} = auth();

    if (!userId){
        redirect('/sign-in');
    }

    const response = await axios.get('http://localhost:8090/admin/store');
    const store = response.data.store;

    if (!store){
        redirect('/');
    }

    return (
        <>
            <div>This will be a Navbar</div>
            {children}
        </>
    )

}