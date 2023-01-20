import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import poster from '../assets/poster.png'


const Homecontent = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3001/mbooks'
                })
                console.log(res.data, "data")
                console.log(res.data.data, "data")
                setList(res.data.data)
            }
            catch (err) {
                console.error(err.message)
            }
        }

        getData();

    }, [list])

    return (
        <>
            <div className='flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400'>
                <div className='p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3  bg-[#fdfdfd80] w-[100%] md:w-[65%]' >

                    {
                        list.map((item,id) => (
                            <>
                                <div key={id} className='flex flex-col drop-shadow-xl rounded-xl bg-[#fdfdfd] backdrop-blur-sm h-auto hover:bg-[#edf5fc] w-auto p-1'>  
                                    <div className='rounded-xl flex
                                justify-center w-auto bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r'>
                                        <img className='rounded-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                                    </div>
                                    <div className='flex flex-col text-center md:text-justify p-5 w-auto text-sm'>
                                        <h1 className='font-bold mb-2'>{item.title}</h1>
                                        <h3 className='text-xs text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Catagory </span> &nbsp; {item.category}</h3>
                                        <p className='p-1 h-20 overflow-hidden'>{item.excerpt}</p>
                                        <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; {item.ISBN}</p>
                                        <p className=''><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp; {item.reviews
                                        }</p>
                                        <NavLink to={`/review/${item._id}`} >
                                            <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-1 rounded-lg w-16 mt-2 text-xs'>Review</button>
                                        </NavLink>
                                    </div>

                                </div>
                            </>
                        ))

                    }

                </div >
            </div>
        </>
    )
}

export default Homecontent