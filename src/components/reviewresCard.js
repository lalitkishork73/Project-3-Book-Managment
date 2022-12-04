import React from 'react'

const ReviewresCard = () => {
    return (
        <>
            <div className='ml-16 bg-slate-100 rounded-lg p-3 max-w-md drop-shadow-lg'>
                <p className='font-bold mb-1'> joe doe</p>
                <p className='mb-1'>You branch will be checked as part of the demo. Branch name should follow the naming convention project/booksManagementGroupX</p>
                <div className='flex'>
                    <p className='mb-3 text-white bg-yellow-400 p-1 font-bold rounded-md '>Rating : 5</p>
                </div >
                <button className='bg-sky-400 p-2 rounded-md hover:bg-green-400'><AiTwotoneEdit className='text-white scale-125' /></button>
            </div>
        </>
    )
}

export default ReviewresCard