import React, { useState } from 'react'
import { GrStar } from 'react-icons/gr'

const Homecontent = () => {
    let star = [1, 1, 1, 1, 1];


    return (
        <>
            <div className='p-5 grid grid-cols-2 gap-5 bg-gradient-to-r from-blue-400 to-emerald-400 ' >
                <div className='flex flex-col gap-2 drop-shadow-xl rounded-lg  p-3 bg-[#e0faf698] backdrop-blur-sm'>
                    <h1 className='font-bold'>Life of Pappu</h1>
                    <h3 className='text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '>Catagory </span> Politics</h3>
                    <p>This time each group should have a single git branch. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention project/booksManagementGroupX</p>
                    <div className='flex gap-2'>
                        {
                            star.map((item) => (
                                <>
                                    <GrStar className='text-yellow-400 scale-125' />
                                </>))
                        }
                    </div>
                </div>
                <div>
                    
                </div>

            </div>
        </>
    )
}

export default Homecontent