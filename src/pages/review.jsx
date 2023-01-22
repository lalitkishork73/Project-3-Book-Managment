import React, { useState, useEffect } from 'react'
import ReviewCard from '../components/reviewCard';
import { AiTwotoneEdit, AiFillStar, AiFillDelete } from 'react-icons/ai'
import UpdateReview from '../components/updateReview';
import { useLocation, useParams } from 'react-router-dom'
import poster from '../assets/poster.png';
import axios from 'axios';
import { FaUserAstronaut } from 'react-icons/fa'


const Review = () => {

    const [RId, setRId] = useState();
    const [active, setActive] = useState(false);
    const [actives, setActives] = useState(false);
    const showMenuCreate = () => {
        setActive(!active);
    }
    const showMenuUpdate = (RvId) => {
        setRId(RvId)
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
                // console.log(res.data.data.reviewData[0]._id)

            } catch (err) { console.error(err) }
        }

        getData();

    }, [db, rewlist])

    const deleteReview = async (data) => {
        try {
            const DEL_URL = `http://localhost:3001/books/${id}/review/${data}`;

            await axios.delete(DEL_URL);
            // const res = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
            // setData(res.data.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="relative flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-300 h-auto">
                <div className="w-[65%] mt-5 ">
                    <div className='flex flex-col gap-2 drop-shadow-xl rounded-lg  p-3 bg-[#fdfdfd] backdrop-blur-sm'>
                        <div className='flex flex-col md:flex-row drop-shadow-xl rounded-xl backdrop-blur-sm h-auto bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r text-white p-5'>
                            <div className='md:rounded-l-xl flex 
                                justify-center md:justify-start w-auto mr-5 p-2'>
                                <img className='rounded-xl lg:rounded-l-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                            </div>
                            <div className='relative flex flex-col justify-around text-center md:text-justify p-2 w-[100%] text-sm overflow-hidden'>

                                <h1 className='font-bold mb-2 text-xl uppercase'>{db.title}</h1>
                                <h3 className='text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Category </span> &nbsp;{db.category}</h3>
                                <p className='p-1 h-20 mt-5'>{db.excerpt}</p>
                                <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; {db.ISBN}</p>
                                <p className='p-1'><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp;{db.reviews}
                                </p>
                                <div className='flex justify-start mt-3'>
                                    <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-3 rounded-lg w-auto text-white text-xs' onClick={showMenuCreate}> Review</button>
                                </div>
                            </div>

                        </div>
                        <p className='mt-6 bg-sky-600 rounded-md text-white text-center font-bold p-3 mb-5'>Reviews</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-screen-xl'>

                            {rewlist.map((list, id) => (<>
                                <div key={id} className='flex bg-slate-100 rounded-lg p-1 text-sm  drop-shadow-lg w-auto'>
                                    <div><FaUserAstronaut className='w-auto mr-5 text-sky-500' /></div>
                                    <div className='w-auto'>
                                        <p className='font-bold mb-1'>{list.reviewedBy}</p>
                                        <div className='flex flex-row'>
                                            {
                                                [...Array(list.rating)].map((index) => (
                                                    <p key={index} className='text-yellow-400 p-1 font-bold scale-110'> <AiFillStar /></p>
                                                )
                                                )}
                                        </div >
                                        <p className='w-auto h-12 overflow-hidden'>{list.review}</p>
                                        <div className='gap-2 flex'>
                                            <button className='bg-sky-400 p-2 rounded-full hover:bg-green-400' onClick={(e) => {
                                                e.preventDefault()
                                                showMenuUpdate(list._id)
                                            }}><AiTwotoneEdit className='text-white scale-125' /></button>
                                            <button className='bg-sky-400 p-2 rounded-full hover:bg-red-500' onClick={(e) => {
                                                e.preventDefault()
                                                deleteReview(list._id)
                                            }}><AiFillDelete className='text-white scale-125' /></button>
                                        </div>
                                    </div>
                                </div>

                            </>))}

                        </div>
                    </div>
                    <div className="">
                        <ReviewCard showMenuCreate={showMenuCreate} active={active} Id={id} />
                    </div>
                    <div className="">
                        <UpdateReview showMenuUpdate={showMenuUpdate} actives={actives} Id={id} RId={RId} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Review