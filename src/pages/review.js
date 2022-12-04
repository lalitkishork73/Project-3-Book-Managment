import React, { useState } from 'react'
import ReviewCard from '../components/reviewCard';
import { AiTwotoneEdit } from 'react-icons/ai'
import UpdateReview from '../components/updateReview';


const Review = () => {
    const [active, setActive] = useState(false);
    const [actives, setActives] = useState(false);
    const showMenuCreate = () => {
        setActive(!active);
    }
    const showMenuUpdate = () => {
        setActives(!actives);
    }
    return (
        <>
            <div className="relative flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-300 h-auto">
                <div className="max-w-screen-xl mt-5 ">
                    <div className='flex flex-col gap-2 drop-shadow-xl rounded-lg  p-3 bg-[#fdfdfd] backdrop-blur-sm'>
                        <h1 className='font-bold'>Life of Pappu</h1>
                        <h3 className='text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Catagory </span>&nbsp; Politics</h3>
                        <p className='ml-1'>This time each group should have a single git branch. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention project/booksManagementGroupX</p>
                        <p className='ml-2'><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp; 25</p>
                        <div className='flex justify-center'>
                            <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-3 rounded-lg w-auto text-white ' onClick={showMenuCreate}> Review</button>
                        </div>
                        <p className='mt-6 bg-sky-600 rounded-md text-white text-center font-bold p-3 mb-5'>Reviews</p>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='ml-16 bg-slate-100 rounded-lg p-3 max-w-md drop-shadow-lg'>
                                <p className='font-bold mb-1'> joe doe</p>
                                <p className='mb-1 ml-1'>You branch will be checked as part of the demo. Branch name should follow the naming convention project/booksManagementGroupX</p>
                                <div className='flex'>
                                    <p className='mb-3 text-white bg-yellow-400 p-1 font-bold rounded-md '>Rating : 5</p>
                                </div >
                                <button className='bg-sky-400 p-2 rounded-md hover:bg-green-400' onClick={showMenuUpdate}><AiTwotoneEdit className='text-white scale-125' /></button>
                            </div>

                        </div>
                    </div>
                    <div className="">
                        <ReviewCard showMenuCreate={showMenuCreate} active={active} />
                    </div>
                    <div className="">
                        <UpdateReview showMenuUpdate={showMenuUpdate} actives={actives} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default Review