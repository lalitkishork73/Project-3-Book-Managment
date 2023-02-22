import React from 'react'
import { NavLink } from 'react-router-dom';
import poster from '../assets/poster.png';

const CardHome = ({ item, index }) => {
    return (
        <>
            <div key={index} className='flex flex-col drop-shadow-xl rounded-xl bg-[#fdfdfd] backdrop-blur-sm h-auto hover:bg-[#edf5fc] w-auto p-1'>
                <div className='rounded-xl flex
            justify-center w-auto bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r'>
                    <img className='rounded-xl min-w-[10rem] max-h-[15rem]' src={item.bookCover} />
                </div>
                <div className='flex flex-col text-center md:text-justify p-5 w-auto text-sm'>
                    <h1 className='font-bold mb-2 uppercase'>{item.title}</h1>
                    <h3 className='text-xs text-gray-500'><span className='bg-cyan-400 text-white p-1 rounded-lg '> Catagory </span> &nbsp; {item.category}</h3>
                    <p className='p-1 h-20 overflow-hidden'>{item.excerpt}</p>
                    <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; {item.ISBN}</p>
                    <p className=''><span className='bg-black text-white p-1 rounded-md text-xs'>Total Reviews </span> &nbsp; {item.reviews
                    }</p>
                    <NavLink to={`/review/${item._id}`} >
                        <button className='bg-gradient-to-r from-green-400 to-blue-300 hover:from-pink-200 hover:to-yellow-500 p-1 rounded-lg w-16 mt-2 text-xs'>Review</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default CardHome