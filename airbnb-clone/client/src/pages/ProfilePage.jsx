import axios from "axios";
import { useState } from "react";
import { useContext } from "react"
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext"
import PlacesPage from "./PlacesPage";

export default function ProfilePage(){

    const [redirect,setRedirect]=useState(false);
    const {ready,user,setUser}=useContext(UserContext);
    let {subpage}=useParams();
    if ( subpage===undefined){
        subpage='profile';
    }

    async function logout(){
        await axios.post('/logout')
        setUser(null)
        setRedirect('/');
    }

    if (!ready){
        return 'Loading...';
    }

    if (ready&&!user&&!redirect){
        return <Navigate to={'/login'}/>
    }

    if (redirect){
        return <Navigate to={redirect}/>        
    }

    return(                
        <div>
            <AccountNav/>
            {subpage==='profile' &&(
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>            
            )}
            {subpage==='places' && (
                <PlacesPage/>
            )}
        </div>
    )
}