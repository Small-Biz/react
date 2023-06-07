import axios from "axios";
import { useState } from "react";
import { InstrumentCodeContext } from "../../InstrumentCodeContext";
import InstrumentMenu from "./InstrumentMenu";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

export default function({instrument}){

    return(
        <div>
            <div className="flex justify-between">
                <div className="mx-5 my-4"><Logo/></div>
                <div className="mx-5 my-4"><Search/></div>
            </div>
            <div className="my-1 w-full bg-sky-500">
                {instrument && (<InstrumentMenu/>)}
                {!instrument && (<Menu/>)}
            </div>
        </div>
    )

};