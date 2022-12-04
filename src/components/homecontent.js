import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { GrStar } from 'react-icons/gr'
import axios from 'axios';


const Homecontent = () => {
    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:3001/mbooks'
        })
            .then(function (response) {
                console.log(response.data)
            });
    }, [])

    return (
        <>
            <div className='p-5 grid grid-cols-2 gap-5 bg-gradient-to-r from-blue-400 to-emerald-400 ' >
                <div className='flex flex-col gap-2 drop-shadow-xl rounded-lg  p-3 bg-[#fdfdfdb9] backdrop-blur-sm'>
                    <h1 className='font-bold'>Life of Pappu</h1>
                    <h3 className='text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Catagory </span> &nbsp; Politics</h3>
                    <p className='ml-2 p-1'>This time each group should have a single git branch. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention project/booksManagementGroupX</p>
                    <p className='ml-2'><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp; 25</p>

                    <NavLink to='/review'>
                        <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-3 rounded-lg w-32'>Review</button>
                    </NavLink>


                </div>

            </div>
        </>
    )
}

export default Homecontent