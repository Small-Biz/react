"use client"

import axios from "axios";
import { useState } from "react";

interface DashboardPageProps{
    params: {storeId: string}
};

const DashboardPage:React.FC<DashboardPageProps>=({
    params
}) => {

    const [store,setStore] = useState(null);

    if (!store){
        axios.get('http://localhost:8090/admin/store')///'+params.storeId)
        .then( function(response){
            setStore(response.data.store);
        })
    }else{

        return (
            <div>
                Active Store: {store['name']}
            </div>
        )

    }

    return (
        <div>
            Loading...
        </div>
    )

}

export default DashboardPage;