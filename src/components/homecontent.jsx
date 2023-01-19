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
                <div className='p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3  bg-[#fdfdfd80] w-[100%] md:w-[85%]' >

                    {
                        list.map((item) => (
                            <>
                                <div key={item.id} className='flex flex-col md:flex-row drop-shadow-xl rounded-xl bg-[#fdfdfd] backdrop-blur-sm h-auto hover:bg-[#faf9de]'>
                                    <div className='md:rounded-l-xl flex
                                justify-center md:justify-start w-[100%]'>
                                        <img className='rounded-xl md:rounded-l-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                                    </div>
                                    <div className='flex flex-col text-center md:text-justify p-2 w-[100%]'>
                                        <h1 className='font-bold mb-2'>{item.title}</h1>
                                        <h3 className='text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Catagory </span> &nbsp; {item.category}</h3>
                                        <p className='p-1'>{item.excerpt}</p>
                                        <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; {item.ISBN}</p>
                                        <p className=''><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp; {item.reviews
                                        }</p>
                                        <NavLink to={`/review/${item._id}`} >
                                            <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-3 rounded-lg w-32 mt-2'>Review</button>
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