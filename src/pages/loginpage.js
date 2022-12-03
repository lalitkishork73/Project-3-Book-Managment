import React from 'react'
import { NavLink } from 'react-router-dom';
// import bg from '../assets/bg-auth.jpg';

const Loginpage = () => {
    return (
        <>

            <div className="flex justify-center items-center h-[90vh] bg-[url('/src/assets/bg-auth.jpg')]">
                <div className='w-auto h-auto rounded-lg bg-black/70 backdrop-blur-sm p-5 text-white drop-shadow-lg'>
                    <form className='p-3 flex flex-col'>
                        <h1 className='text-center font-bold'>Login</h1>
                        <input type='text' placeholder='Username' className="p-2 border-white border-b-2 mt-5 mb-5 rounded-lg bg-transparent" />
                        <input type='text' placeholder='Password' className="p-2 border-white border-b-2 mt-5 mb-5 rounded-lg bg-transparent  " />
                        <div className='flex justify-center mt-6'>
                            <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-3 rounded-lg w-32'>Login</button>
                        </div>

                        <p className='mt-5'>Don't have an account? <NavLink to='/signup' className='text-cyan-500'>Sign Up</NavLink> </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Loginpage;