import { useEffect } from "react";
import { createContext,useState } from "react";

export const InstrumentCodeContext=createContext({});

export function InstrumentCodeContextProvider({children}){
    const [instrumentCode,setInstrumentCode]=useState(null);

    useEffect(()=>{
            setInstrumentCode(sessionStorage.getItem("instrument_code"));
    },[]);

    return(
        <InstrumentCodeContext.Provider value={{instrumentCode,setInstrumentCode}}>
        {children}
        </InstrumentCodeContext.Provider> 
    );
}