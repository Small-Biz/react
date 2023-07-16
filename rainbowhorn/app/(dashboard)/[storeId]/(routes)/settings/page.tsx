import { auth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps{
    params:{
        storeId:string;
    }
}

const SettingPage:React.FC<SettingsPageProps>=async ({
    params
})=>{

    const {userId}=auth();

    if (!userId){
        redirect('/sign-in');
    }

    const response= await axios.get(`http://localhost:8090/admin/stores/${params.storeId}`);

    if (!response){
        redirect('/');
    }

    const store=response.data.store;

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingPage;