import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { InstrumentCodeContext } from '../../InstrumentCodeContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import InstrumentMenu from '../Header/InstrumentMenu';

export default function(){

    const {instrumentCode,setInstrumentCode}=useContext(InstrumentCodeContext);
    const [profile,setProfile]=useState(null);
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_ENDPOINT+'companyProfile?instrumentCode='+instrumentCode).then(response=>{
            setProfile(response.data)
        })
    }, [instrumentCode]);

    if (profile===null){
        return(
            <div className="flex flex-col min-h-screen">
            <Header instrument={true}/>
                <div>There is no profile</div>
            </div>
        )
    }

    return(
        <div className="flex flex-col min-h-screen">
            <Header instrument={true}/>
            <div id="main-content-container">                
                <div className="profile-container">
                    <div><span className="profile-title">Profile</span></div>                
                    <table className="table table-sm profile-table border text-left">
                        <tr>
                            <td>Code:</td>
                            <td>{profile.instrumentCode}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{profile.nameEn}</td>
                        </tr>
                        <tr>
                            <td>Activities:</td>
                            <td className="profile-table-activities">{profile.principalActivitiesEn}</td>
                        </tr>
                        <tr>
                            <td>Classification:</td>
                            <td>{profile.classificationEn}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td className="profile-table-address">{profile.addressEn}</td>
                        </tr>
                        <tr>
                            <td>Website:</td>
                            <td>{profile.website}</td>
                        </tr>
                        <tr>
                            <td>E-mail:</td>
                            <td>{profile.email}</td>
                        </tr>
                        <tr>
                            <td>Telephone:</td>
                            <td>{profile.telephone}</td>
                        </tr>
                        <tr>
                            <td>Fax:</td>
                            <td>{profile.fax}</td>
                        </tr>
                        <tr>
                            <td>Listing Date:</td>
                            <td>{profile.listingDate}</td>
                        </tr>
                        <tr>
                            <td>Trade Currency:</td>
                            <td>{profile.tradeCurrency}</td>
                        </tr>
                        <tr>
                            <td>Par Currency:</td>
                            <td>{profile.parCurrency}</td>
                        </tr>
                        <tr>
                            <td>Par Value:</td>
                            <td>{profile.parValue}</td>
                        </tr>
                        <tr>
                            <td>Board Lot:</td>
                            <td>{profile.boardLot}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}