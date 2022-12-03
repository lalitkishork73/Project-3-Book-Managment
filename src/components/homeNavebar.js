import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { SiBookstack } from 'react-icons/si';


const Homenavebar = () => {
  return (
    <>
      <div className='z-40 bg-black text-white flex justify-between p-2'>
        <div className='ml-9 p-2'>
          <Link to='/'><h1 className='font-bold text-yellow-300'>Book's Lab</h1></Link>
        </div>
        <div className='p-2 scale-110'>
          <SiBookstack className='text-yellow-300' />
        </div>
        <div className='mr-9'>
          <ul className='flex p-2'>
            <li className='mr-9'>
              <NavLink to='/'><h1 className='hover:text-yellow-200 hover:scale-105'>Home</h1></NavLink>
            </li>
            <li className='mr-9'>
              <NavLink to="login"><h1 className='hover:text-yellow-200 hover:scale-105'>LogIn</h1></NavLink>
            </li>
            <li>
              <NavLink to="signup"><h1 className='hover:text-yellow-200 hover:scale-105'>SignUp</h1></NavLink>
            </li>
          </ul>
        </div>
      </div>
      
    </>
  )
}


export default Homenavebar;