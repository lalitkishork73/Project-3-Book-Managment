import React from 'react'
import { NavLink } from 'react-router-dom';

const Signuppage = () => {
    return (
        <>

            <div className="flex justify-center items-center h-[90vh] bg-[url('/src/assets/bg-auth.jpg')]">
                <div className='w-auto h-auto rounded-lg bg-black/70 backdrop-blur-sm p-5 drop-shadow-lg'>
                    <form className='p-3 flex flex-col text-white'>
                        <h1 className='text-center font-bold'>SignUp</h1>
                        <input type='text' placeholder='Name' className="p-2 mt-5 mb-5 rounded-lg bg-transparent  border-white border-b-2" />
                        <input type='text' placeholder='Phone' className="p-2  border-white border-b-2 mt-5 mb-5 rounded-lg bg-transparent   " />
                        <input type='text' placeholder='Email' className="p-2  border-white border-b-2 mt-5 mb-5 rounded-lg bg-transparent" />

                        <select className='bg-transparent text-gray-400 p-2 mt-5 mb-5' >
                            <option value="" selected disabled hidden>Choose Title Here</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                        </select>
                        <label for='address' className='mt-5'>Address</label>
                        <input type='text' placeholder='Street' className="p-2  border-white border-b-2 mt-1 mb-1 rounded-lg bg-transparent   " />
                        <input type='text' placeholder='City' className="p-2  border-white border-b-2 mt-1 mb-1 rounded-lg bg-transparent   " />
                        <input type='text' placeholder='Pincode' className="p-2  border-white border-b-2 mt-1 mb-5   rounded-lg bg-transparent   " />
                        <input type='password' placeholder='Password' className="p-2  border-white border-b-2 mt-5 mb-5 rounded-lg bg-transparent   " />
                        <div className='flex justify-center mt-6'>
                            <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-3 rounded-lg w-32'>SignUp</button>
                        </div>
                        <p className='mt-5'>Have you already account? <NavLink to='/login' className='text-cyan-500'>Login</NavLink> </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signuppage;