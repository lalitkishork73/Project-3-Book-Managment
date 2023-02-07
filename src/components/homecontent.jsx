import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BiSearchAlt2 } from 'react-icons/bi'
import CardHome from './CardHome'


const Homecontent = () => {
    const [list, setList] = useState([]);
    const [errr, setErr] = useState('');
    const [search, setSearch] = useState('');
    const [searchData, setsearchData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3001/mbooks'
                })
                // console.log(res.data.status == true)
                // console.log(res.data.data.length == 0, "data")
                if (res.data.data.length == 0) {
                    setErr("data not found")
                }
                setList(res.data.data)
            }
            catch (err) {
                console.error(err.message)
                // setErr("data not found")
            }
        }

        getData();

    }, [list])

    return (
        <>
            <div className=' flex justify-center bg-black p-7 '>
                <input type="text" placeholder="Search" className='pl-2 p-2 w-[100%] sm:w-[30%] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:sky-500 block rounded-l-md sm:text-sm'
                />
                <button className='text-white text-3xl bg-slate-800 rounded-r-md pl-2 pr-2 p-2'><BiSearchAlt2 /></button>
            </div>
            <div className='flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400'>
                {errr ? <>
                    <div className='h-[50vh] flex justify-center items-center'>
                        <h1 className='text-white text-4xl text-center'>Book Not Found!</h1>
                    </div>
                </> : !search ? <>
                    {
                        searchData ? <>
                            {searchData.map((item, index) => (
                                <>
                                    <CardHome item={item} index={index} />
                                </>
                            ))}
                        </> : <><div><h1>data not Found</h1></div></>
                    }
                </> :
                    <>
                        <div className='p-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3  bg-[#fdfdfd80] w-[100%] md:w-[65%]' >

                            {
                                list.map((item, index) => (
                                    <>
                                        <CardHome item={item} index={index} />
                                    </>
                                ))
                            }
                        </div >
                    </>
                }
            </div>
        </>
    )
}

export default Homecontent