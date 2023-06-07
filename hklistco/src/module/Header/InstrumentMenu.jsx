import { Link, NavLink } from "react-router-dom"

export default function(){

    return(
        <div className="flex justify-center min-w-[50%]">
            <div className="w-px h-14 bg-white"></div>
            <Link to="/home" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Home</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/instrument/profile" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Profile</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/instrument/announcements" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Announcement</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/instrument/financialreports" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Financial Statement</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/instrument/pressrelease" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Press Release</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/instrument/documents" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Document</Link>
            <div className="w-px h-14 bg-white"></div>
            <Link to="/instrument/governance" className="w-40 h-14 text-2xl p-3 text-white bg-sky-400">Governance</Link>
            <div className="w-px h-14 bg-white"></div>
        </div>
    )

};