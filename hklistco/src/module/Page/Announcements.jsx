import axios from 'axios';
import { useState } from 'react';
import Header from '../Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/Footer';

export default function(){

    const [currPage,setCurrPage]=useState(1);
    const [numPerPage,setNumPerPage]=useState(10);
    const [announcements,setAnnouncements]=useState(null);
    const [totalItems,setTotalItems]=useState(0);
    const [totalPages,setTotalPages]=useState(1);

    function onClickFirstPage(){
        setCurrPage(1);
        getAnnouncements();
    }
    function onClickPreviousPage(){
        if (currPage==1)return;
        setCurrPage(currPage-1);
        getAnnouncements();
    }
    
    function onClickNextPage(){
        if (currPage==totalPages)return;
        let newCurrPage=currPage+1;
        console.log('2 newCurrPage: ' + newCurrPage);
        setCurrPage(newCurrPage);
        getAnnouncements();
    }
    function onClickLastPage(){
        setCurrPage(totalPages);
        getAnnouncements();
    }

    if (!announcements){   
        getAnnouncements();
    }
    async function getAnnouncements(){
        console.log('3 currPage: ' + currPage);
        var response=await axios.get(process.env.REACT_APP_API_ENDPOINT+'getAnnouncements?instrumentCode=00003&numPerPage=10&page='+currPage);

//        console.log('response: ' + response.data);
//        console.log('response.totalItems: ' + response.data.totalItems);
//        console.log('response.announcements: ' + response.data.announcements);
        setAnnouncements(response.data.announcements)
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
    }

    if (announcements===null||announcements.length === 0){
        return(
            <div className="flex flex-col min-h-screen">
            <Header instrument={true}/>
                <div>There is no data</div>
            </div>
        )
    }

    return(
        <div className="flex flex-col min-h-screen">
            <Header instrument={true}/>
            <div id="main-content-container">
                <div className="announcements-container">
                    <div><span className="announcements-table-title">Announcements</span></div>
                    <div className="announcements-table-action-bar">
                        <div>
                            <span>Per Page:</span>
                            <select>
                                <option value="10">10</option>
                                <option value="10">20</option>
                                <option value="10">50</option>
                                <option value="10">100</option>
                            </select>
                            <span className="announcements-table-action-bar-total">Total:</span><span>{totalItems}</span>
                        </div>

                        <div className='btn-group' role="group">
                            <button className="button btn border" onClick={onClickFirstPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                            </button>
                            <button className="button btn border" onClick={onClickPreviousPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            </button>
                            <button className="button btn border">{currPage}</button>
                            <button className="button btn border" onClick={onClickNextPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            </button>
                            <button className="button btn border" onClick={onClickLastPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                            </button>
                        </div>
                    </div>
                    <table className="table table-sm table-bordered announcements-table">
                        <thead className="thead-dark">
                            <tr>
                            <td scope="col">Date</td>
                            <td scope="col">Time</td>
                            <td scope="col">Name</td>
                            <td scope="col"></td>
                            </tr>
                        </thead>
                        <tbody>
                        {announcements?.length> 0 && announcements.map(ann=>(
                                <tr>
                                    <td><div className="announcements-table-cell-date">{ann.uploadDate}</div></td>
                                    <td><div className="announcements-table-cell-time">{ann.uploadTime}</div></td>
                                    <td><div className="announcements-table-cell-name">({ann.file}){ann.name}</div></td>
                                    <td><button className="btn btn-sm btn-primary">Download</button></td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}