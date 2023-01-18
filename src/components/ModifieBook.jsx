import React, { useState } from 'react'
import poster from '../assets/poster.png'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Updatebook from './updatebook'
const ModifieBook = () => {
    const [active, setActive] = useState(false);

    const showMenuUpdate = () => {
        setActive(!active);
    }
    return (
        <>
            <main>
                <section className='flex flex-col sm:flex-row gap-3 '>
                    <div key='' className='relative flex flex-col md:flex-row drop-shadow-xl rounded-xl gap-2 bg-gradient-to-tl from-green-300 via-yellow-300 to-pink-300 text-sm '>
                        <div className='md:rounded-l-xl flex
                                justify-center md:justify-start w-auto h-auto pr-2'>
                            <img className='rounded-xl md:rounded-l-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                        </div>
                        <div className='flex flex-col text-center md:text-justify p-2 w-[100%] bg-white rounded-b-lg  sm:rounded-r-lg '>
                            <h1 className='font-bold mb-2'>title</h1>
                            <h3 className='text-gray-500'><span className='bg-black text-white p-1 rounded-lg text-xs'> Catagory </span> &nbsp; dadasd</h3>
                            <p className='p-1 w-72 h-16 overflow-hidden'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat a excepturi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis sequi facere incidunt dolorum, natus perferendis, nobis ipsam necessitatibus corrupti cumque labore laudantium id voluptatum. Necessitatibus, voluptatibus architecto ratione laboriosam quidem ab minus! </p>
                            <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; 2</p>
                            <p className=''><span className='bg-black text-white p-1 rounded-md text-xs'>Total Reviews </span> &nbsp; redasdafad</p>

                            <div className='mt-5 flex justify-around'>
                                <button className='border-2 rounded-full p-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-white'
                                onClick={showMenuUpdate}><AiFillEdit /></button>
                                <button className='border-2 rounded-full p-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white'><AiFillDelete /></button>
                            </div>

                        </div>

                    </div>
                    <div>
                        <Updatebook showMenuUpdate={showMenuUpdate} active={active} Id={0} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default ModifieBook