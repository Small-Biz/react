import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {InstrumentCodeContext} from "../../InstrumentCodeContext";

export default function(){

    const {instrumentCode,setInstrumentCode}=useContext(InstrumentCodeContext);
    const [searchText,setSearchText]=useState("");
    const [redirect,setRedirect]=useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
            sessionStorage.setItem("instrument_code",searchText);
            setInstrumentCode(searchText);
            setRedirect(true);

        }
    };

    if (redirect){
        if (window.location.href.indexOf('/instrument/profile') >= 0 ){

        }else{
            return <Navigate to={'/instrument/profile'}/>;
        }
    }

    return (
        <div>
            <div className="flex justify-end mb-1">
                <div className="mx-1">EN</div>
                <div className="mx-1">|</div>
                <div className="mx-1">HK</div>
                <div className="mx-1">|</div>
                <div className="mx-1">CN</div>
            </div>
            <div>
                <span className="text-base text-sky-500">股票代號</span>
                <input className="border-2 border-sky-500 ml-2"
                value={searchText}
                onChange={ev=>setSearchText(ev.target.value)} 
                onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}