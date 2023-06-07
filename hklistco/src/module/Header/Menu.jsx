import { Link, NavLink } from "react-router-dom"

export default function(){

    return(
        <div className="flex justify-center min-w-[50%]">
            <div className="w-px h-14 bg-white"></div>
            <Link to="/home" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Home</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/ourclients" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Our Clients</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/services" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Our Services</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/linkage" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Linkage</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/secretary" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Secretary</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/career" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Career</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/contactus" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Contact Us</Link>
            <div className="w-px h-14 bg-white"></div>
        </div>
    )

};