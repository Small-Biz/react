import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage(){

    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/places').then(response=>{
            setPlaces(response.data);
        })

    }, []);

    return(
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {places.length >0&& places.map(p=>(
                <Link to={'/place/'+p._id}>
                    <div className="bg-gray-500 rounded-2xl flex">
                    {p.photos?.[0] && (
                        <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+p.photos?.[0]} alt=""/>
                        )
                    }
                    </div>
                    <h2 className="font-bold truncate">{p.address}</h2>
                    <h3 className="text-sm text-gray-500 truncate">{p.title}</h3>
                    <div className="mt-2">
                        {p.price && (
                            <span>${p.price} per night</span>
                        )}
                        {!p.price && (
                            <span>HKD $-</span>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}