"use client";

import PreviewModal from "@/components/preview-modal";
import { useEffect, useState } from "react"

const ModalProvider = () =>{
    const [isMounted,setIsMonted] = useState(false);

    useEffect(() =>{
        setIsMonted(true);
    },[])

    if (!isMounted){
        return null;
    }

    return  (
        <>
            <PreviewModal/>
        </>
    )
}

export default ModalProvider;