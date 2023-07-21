import Billboard from "@/data/billboard";
import axios from "axios";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({
    params
}:{
    params: {billboardId: string}
}) =>{
    
    const response = await axios.get(`http://localhost:8090/admin/billboards/${params.billboardId}`);
    var billboard:Billboard=response.data.billboard;

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard}/>
            </div>
        </div>
    )
}

export default BillboardPage;