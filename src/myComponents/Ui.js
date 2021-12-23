import React, { useEffect, useState, useRef } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import "./Ui.css";


export default function Ui() {

    const [coment, setComent] = useState("");
    const [comentsArr, setComentsArr] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState("catss");
    const [gifSearchTogler, setGifSearchTogler] = useState("none");

    //refs
    const searchInput = useRef(null);

    //functions
    const postFun = () => {
        setComentsArr([{ "coment": coment }, ...comentsArr]);
        setComent("");
    }

    // useEffect(() => { 
    const mySearch = (e) => {
        const gf = new GiphyFetch('SQfBgDlLiHOjDptzNtMp8iotFIEP6pBI');


        const search = async (e) => {
            try {
                const result = await gf.search(e.target.value, { sort: "recent" });
                console.log("search", result.data);
                setSearchData(result.data);

            } catch (error) {
                console.error("search", error);
            }
        };
        search(e);
        setSearchKeyWord(e.target.value);
        setGifSearchTogler("");
    }
    // },[])

    const gifAdder = (url) => {
        setComentsArr([{ "url": url }, ...comentsArr]);
        setGifSearchTogler("none");

    }
    const setGifSearchToglerSetter = () =>{
        return new Promise((resolve, reject)=>{
        resolve(setGifSearchTogler(""));
    })
}

    const gifSearchToglerFun =  async() => {
        if (gifSearchTogler == "none") {
           // searchInput.current.focus();
            await setGifSearchToglerSetter();
             searchInput.current.focus();
        //    let promise = new Promise((resolve, reject)=>{
        //        resolve(setGifSearchTogler(""));
        //    })

            // setGifSearchTogler("");
            
        }
        else {
            setGifSearchTogler("none");
           
        }


    }

    return (
        <>
            <div class=" mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-4 max-w-lg">
                <div class="" >

                    <div class="p-2 ">
                        <div class="flex justify-center">
                            <textarea className="bg-slate-100 w-full max-h-10 rounded-xl px-2 py-1 font-bold shadow-md" type="text"  value={coment} onChange={(e) => setComent(e.target.value)} placeholder="Write something here..."></textarea>
                        </div>

                        <div className='flex justify-between m-1  md:flex-row'>
                            <div className='w-6/12 justify-center flex flex-wrap overflow-auto '>
                                <div className='bg-slate-200 w-11/12 h-7 p-1 my-1 text-xs rounded-lg font-bold shadow-sm hover:bg-slate-300 active:bg-slate-400' onClick={() => gifSearchToglerFun()}>
                                    <button className='rounded-full bg-gray-300 mt-0.5 px-2 font-extrabold'>GIF</button> </div>
                                <div className='absolute mt-9 w-40 md:w-2/12' style={{ display: gifSearchTogler }}>
                                    <div className=' backdrop-sepia-50 bg-cyan-500/80 p-1 rounded-md flex justify-center flex-col ' >
                                        <div className='justify-center flex '>
                                            <input ref={searchInput} className='font-bold w-20 md:w-50 rounded-md px-2'  type="text"  placeholder='GIF...' value={searchKeyWord} onChange={(e) => mySearch(e)} ></input>
                                        </div>
                                        <div className='m-1 max-h-80 overflow-auto scroll-m-2 '>
                                            {searchData.map((data) => <img onClick={() => gifAdder(data.images.preview_gif.url)} className='p-1 rounded-lg' width="300" src={data.images.preview_gif.url}></img>)}
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className='w-6/12 justify-center flex flex-wrap overflow-auto  '>
                                <div className='bg-slate-200 w-11/12 h-7 p-1 my-1 text-xs rounded-lg shadow-sm ' > ... </div>
                            </div>
                        </div>
                        <div className=' flex justify-between m-1 flex-col md:flex-row'>
                            <div className='w-2xl  justify-center flex flex-wrap overflow-auto my-1 md:w-6/12'>
                                <div className='bg-slate-200 w-11/12 rounded-lg h-7 p-1 text-xs shadow-sm'> ... </div>
                            </div>
                            <div className='w-2xl  justify-center flex flex-wrap overflow-auto my-1 md:w-6/12 '>
                                <div className='bg-slate-200 w-11/12 rounded-lg h-7 p-1 text-xs shadow-sm'> ... </div>
                            </div>
                        </div>
                        <div className=' flex justify-end m-1 flex-col md:flex-row'>
                            <div className='w-2xl  justify-center flex flex-wrap overflow-auto my-1 md:w-6/12 '>
                                {/* <div className='bg-slate-300 w-11/12 rounded-lg h-7 p-1 text-xs'> GIF </div> */}
                                {coment != "" ? <button className='font-bold animate-pulse bg-slate-200 active:bg-sky-700  hover:rounded-md hover:bg-sky-500 hover:text-cyan-50 px-2 border-red-800  rounded-md ' onClick={() => postFun()} >Post</button> :
                                    <button className='font-bold bg-slate-200 active:bg-sky-700  hover:rounded-md hover:bg-sky-500 hover:text-cyan-50 px-2 border-red-800  rounded-md '  onClick={() => postFun()} >Post</button>
                                }

                            </div>
                        </div>
                        <div className=' flex justify-center items-center flex-col bg-cyan-100 rounded-lg shadow-md'>

                            {comentsArr.map((data) => data.coment ? <p className='font-bold capitalize shadow-lg m-1'>{data.coment}</p> : <img className='h-40 w-4/12 rounded-md shadow-lg m-1' src={data.url} />)}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}