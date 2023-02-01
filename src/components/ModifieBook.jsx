import React, { useState, useEffect } from 'react'
import poster from '../assets/poster.png'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Updatebook from './updatebook'
import useAuth from '../hooks/auth'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
const ModifieBook = () => {
    const [active, setActive] = useState(false);
    const [list, setList] = useState([]);
    const { auth, setAuth } = useAuth();
    const Id = auth?.email;
    const [bookId, setBookid] = useState(false);
    const [ifData, setifData] = useState('');

    // console.log(Id)
    useEffect(() => {
        const getData = async () => {
            try {

                const URL = `http://localhost:3001/userbooks/${Id}`
                axios.defaults.headers.common = {
                    "x-Api-key": auth?.accessToken
                }

                const res = await axios.get(URL);
                // console.log(res.data.data)
                // console.log(res.data.data.length == 0)
                if (res.data.data.length == 0) {
                    setifData("BOOK NOT FOUND!")
                }
                setList(res.data.data)
            } catch (err) {
                console.log(err.response)
                if (err.response?.status === 401) {
                    
                    setAuth('')
                    Navigate('/login')
                }
            }
        }

        getData();

    }, [list])


    const deleteBooks = async (id) => {
        // console.log(id)
        const URL = `http://localhost:3001/books/${id}`
        try {
            await axios.delete(URL)
        } catch (err) {
            console.log(err);
        }
    }
    const showMenuUpdate = () => {

        setActive(!active);
    }
    return (
        <>

            <main className=''>
                {
                    ifData ? <>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-center text-4xl text-white'>Book Not Found!</h1>
                        </div>
                    </> :
                        <>
                            <section className='relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-auto p-2 '>

                                {list.map((items, id) =>
                                (
                                    <>
                                        <div key={id} className='md:flex-row drop-shadow-xl w-auto rounded-xl gap-2 bg-gradient-to-tl from-green-300 via-yellow-300 to-pink-300 text-sm '>
                                            <div className='md:rounded-l-xl flex
                                justify-center w-auto h-auto pr-2'>
                                                <img className='rounded-xl md:rounded-l-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                                            </div>
                                            <div className='flex flex-col text-center md:text-justify p-2 w-[100%] bg-white rounded-b-lg  sm:rounded-r-lg '>
                                                <h1 className='font-bold mb-2'>{items.title}</h1>
                                                <h3 className='text-gray-500'><span className='bg-black text-white p-1 rounded-lg text-xs'> Catagory </span> &nbsp; {items.category}</h3>
                                                <p className='p-1 w-auto h-16 overflow-hidden'>{items.excerpt} </p>
                                                <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; {items.ISBN}</p>
                                                <p className=''><span className='bg-black text-white p-1 rounded-md text-xs'>Total Reviews </span> &nbsp;{items.reviews}</p>
                                                <p className=''><span className='bg-black text-white p-1 rounded-md text-xs'>Published </span> &nbsp;{items.releasedAt.slice(0, 10)}</p>
                                                <div className='mt-5 flex justify-around'>
                                                    <button className='border-2 rounded-full p-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white'
                                                        onClick={() => {
                                                            setBookid(items._id);
                                                            showMenuUpdate()
                                                        }}><AiFillEdit /></button>
                                                    <button className='border-2 rounded-full p-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white'
                                                        onClick={() => {
                                                            setBookid(items._id)
                                                            deleteBooks(bookId)
                                                        }}><AiFillDelete /></button>
                                                </div>

                                            </div>

                                        </div>
                                    </>)
                                )}
                            </section>
                        </>
                }
                <section>
                    <Updatebook showMenuUpdate={showMenuUpdate} active={active} Id={bookId} />
                </section>
            </main>
        </>
    )
}

export default ModifieBook