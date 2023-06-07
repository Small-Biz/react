import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

export default function(){

    const [instrumentCode,setInstrument]=useState("");
    const [redirectProfile,setRedirectProfile]=useState(false);
    const [redirectAnnouncements,setRedirectAnnouncements]=useState(false);
    

    function onClickButton1(){
        console.log('onClick Button1 with value: ' + instrumentCode);
        if (instrumentCode && instrumentCode!==""){
            setRedirectProfile(true);
        }
    }

    function onClickButton2(){
        console.log('onClick Button2 with value: ' + instrumentCode);
        if (instrumentCode && instrumentCode!==""){
            setRedirectAnnouncements(true);
        }
    }

    if (redirectProfile){
        return <Navigate to={'/instrument/profile/'+instrumentCode}></Navigate>
    }

    if (redirectAnnouncements){
        return <Navigate to={'/instrument/announcements/'+instrumentCode}></Navigate>
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div id="main-content-container">
                <div className="home-content-container">
                    <div className="home-content-welcome-container">
                        <div className="home-content-welcome-left-container">
                            <div className="home-content-welcome-blue-bar"></div>
                            <div className="text-3xl my-2 text-white font-bold">我們是一家專門提供矛香港上市公司發佈資訊的平台</div>
                            <div className="text-2xl my-2 text-white font-bold">請在右方空格內打入上市公司之代號或關鍵字然後按"最新公告查閱我們客戶最近半年之公告"</div>
                            <div className="home-content-welcome-blue-bar"></div>
                            <div className="mt-2 flex justify-evenly">
                                <button onClick={onClickButton1} className="bg-sky-500 h-10 text-white px-2 py-1 rounded-md">Profile</button>
                                <button onClick={onClickButton2} className="bg-sky-500 h-10 text-white px-2 py-1 rounded-md">Announcements</button>
                            </div>
                        </div>                    
                        <div className="home-content-welcome-right-container">
                            <div className="text-4xl text-white font-bold">Search</div>
                            <div className="text-4xl text-white font-bold">Instrument</div>
                            <input className="h-10 rounded-xl" onChange={ev=>setInstrument(ev.target.value)}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}