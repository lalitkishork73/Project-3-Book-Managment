import React, { useState, useEffect } from 'react'
import ReviewCard from '../components/reviewCard';
import { AiTwotoneEdit } from 'react-icons/ai'
import UpdateReview from '../components/updateReview';
import { useLocation, useParams } from 'react-router-dom'
import poster from '../assets/poster.png';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai'


const Review = () => {
    const [active, setActive] = useState(false);
    const [actives, setActives] = useState(false);
    const showMenuCreate = () => {
        setActive(!active);
    }
    const showMenuUpdate = () => {
        setActives(!actives);
    }
    const [db, setDb] = useState([]);
    const [rewlist, setRewlist] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/bookss/${id}`);
                setDb(res.data.data);
                setRewlist(res.data.data.reviewData)

            } catch (err) { console.error(err) }
        }

        getData();

    }, [db, rewlist])




    return (
        <>
            <div className="relative flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-300 h-auto">
                <div className="w-[70%] mt-5 ">
                    <div className='flex flex-col gap-2 drop-shadow-xl rounded-lg  p-3 bg-[#fdfdfd] backdrop-blur-sm'>

                        <div className='flex flex-col md:flex-row drop-shadow-xl rounded-xl bg-[#fdfdfd] backdrop-blur-sm h-auto hover:bg-[#faf9de]'>
                            <div className='md:rounded-l-xl flex
                                justify-center md:justify-start w-auto mr-5'>
                                <img className='rounded-xl lg:rounded-l-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                            </div>
                            <div className='flex flex-col text-center md:text-justify p-2 w-[100%]'>
                                <h1 className='font-bold mb-2'>{db.title}</h1>
                                <h3 className='text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Category </span> &nbsp;{db.category}</h3>
                                <p className='p-1'>{db.excerpt}</p>
                                <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; {db.ISBN}</p>
                                <p className='p-1'><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp;{db.reviews}
                                </p>
                                <div className='flex justify-start mt-3'>
                                    <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-3 rounded-lg w-auto text-white ' onClick={showMenuCreate}> Review</button>
                                </div>
                            </div>

                        </div>
                        <p className='mt-6 bg-sky-600 rounded-md text-white text-center font-bold p-3 mb-5'>Reviews</p>
                        <div className='grid grid-cols-3 gap-2 max-w-screen-xl'>

                            {rewlist.map((list) => (<>

                                <div key={list.id} className='ml-16 bg-slate-100 rounded-lg p-3  drop-shadow-lg'>
                                    <p className='font-bold mb-1'>{list.reviewedBy}</p>
                                    <p className='mb-1 ml-1'>{list.review}</p>
                                    <div className='flex flex-row'>
                                        {
                                            [...Array(list.rating)].map((index) => (
                                                <p key={index} className='mb-3 text-yellow-400 p-1 font-bold rounded-md '> <AiFillStar /></p>
                                            )
                                            )}

                                    </div >
                                    <button className='bg-sky-400 p-2 rounded-md hover:bg-green-400' onClick={showMenuUpdate}><AiTwotoneEdit className='text-white scale-125' /></button>
                                </div>

                            </>))}

                        </div>
                    </div>
                    <div className="">
                        <ReviewCard showMenuCreate={showMenuCreate} active={active} Id={id} />
                    </div>
                    <div className="">
                        <UpdateReview showMenuUpdate={showMenuUpdate} actives={actives} Id={id} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default Review