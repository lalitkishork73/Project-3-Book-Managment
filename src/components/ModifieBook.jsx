import React from 'react'
import poster from '../assets/poster.png'
const ModifieBook = () => {
    return (
        <>
            <main>
                <section className='flex flex-col sm:flex-row gap-3 '>
                    <div key='' className='flex flex-col md:flex-row drop-shadow-xl rounded-xl bg-[#ffd000] backdrop-blur-sm h-auto hover:bg-[#f8cb00] p-2'>
                        <div className='md:rounded-l-xl flex
                                justify-center md:justify-start w-auto'>
                            <img className='rounded-xl md:rounded-l-xl min-w-[10rem] max-h-[15rem]' src={poster} />
                        </div>
                        <div className='flex flex-col text-center md:text-justify p-2 w-[100%]'>
                            <h1 className='font-bold mb-2'>title</h1>
                            <h3 className='text-gray-500'><span className='bg-black text-white p-1 rounded-lg '> Catagory </span> &nbsp; dadasd</h3>
                            <p className='p-1'>dadad</p>
                            <p className='p-1'><span className='font-bold'>ISBN -</span>&nbsp; 2</p>
                            <p className=''><span className='bg-black text-white p-1 rounded-md'>Total Reviews </span> &nbsp; redasdafad</p>

                            <div className='mt-5 flex justify-around'>
                                <button >edit</button>
                                <button>delete</button>
                            </div>

                        </div>

                    </div>

                </section>
            </main>
        </>
    )
}

export default ModifieBook