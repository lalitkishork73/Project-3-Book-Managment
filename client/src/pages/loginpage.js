import React from 'react'
import Homenavebar from '../components/homeNavebar';

const Loginpage = () => {
    return (
        <>
            <Homenavebar />
            <div className="flex justify-center items-center h-[90vh]">
                <div className='border-2 border-black w-72 h-72 rounded-lg'>
                    <form className='p-3'>
                        <input type='text' placeholder='Username' className="p-2 border-black"/>
                        <input type='text' placeholder='Password' className="p-2 border-black"/>
                        <button className=''>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Loginpage;