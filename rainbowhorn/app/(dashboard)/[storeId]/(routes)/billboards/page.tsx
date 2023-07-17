import {format} from "date-fns";
import axios from "axios";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import Billboard from "@/data/billboard";

const BillboardsPage= async({
    params
}:{
    params: {storeId:string}
})=>{

    const response=await axios.get(`http://localhost:8090/admin/${params.storeId}/billboards`);
    const billboards=response.data.billboardList;

    const formattedBillboards:BillboardColumn[] = billboards.map((item:Billboard)=>({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        updatedAt: format(item.updatedAt, "MMMM do, yyyy")
    }));


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards}/>
            </div>
        </div>
    )
}

export default BillboardsPage;