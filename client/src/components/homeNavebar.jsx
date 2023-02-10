import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { SiBookstack } from 'react-icons/si';
import { FaBars } from "react-icons/fa";
import MenuBar from './MenuBar';
import useAuth from '../hooks/auth';


const Homenavebar = () => {
  const { auth, setAuth } = useAuth();

  const logout = () => {
    setAuth();
  }

  const [active, setActive] = useState(false);
  const showMenu = () => {
    setActive(!active);
  };


  return (
    <>
      <div className='relative z-20 bg-black text-white flex justify-between p-2'>
        <div className='ml-9 p-2'>
          <Link to='/'><h1 className='font-bold text-yellow-300'>Book's Lab</h1></Link>
        </div>
        <div className='p-2 scale-110'>
          <SiBookstack className='text-yellow-300' />
        </div>
        <div className='mr-9'>
          <div>
            <FaBars
              className="md:hidden text-2xl releaive hover:animate-spin"
              onClick={showMenu}
            />
          </div>
          <ul className='hidden md:flex gap-8 p-1 uppercase'>
            <li className='mr-9'>
              <NavLink to='/'><h1 className='hover:text-yellow-200 hover:scale-105'>Home</h1></NavLink>
            </li>
            <li className='mr-9'>
              <NavLink to='/allbooks'><h1 className='hover:text-yellow-200 hover:scale-105'>Publish Books</h1></NavLink>
            </li>
            {
              auth?.accessToken ?
                <>
                  <li>
                    <NavLink to="signup"><h1 className='hover:text-yellow-200 hover:scale-105' onClick={logout}>LogOut</h1></NavLink>
                  </li>
                </>
                : <>
                  <li className='mr-9'>
                    <NavLink to="login"><h1 className='hover:text-yellow-200 hover:scale-105'>LogIn</h1></NavLink>
                  </li>
                  <li>
                    <NavLink to="signup"><h1 className='hover:text-yellow-200 hover:scale-105 '>SignUp</h1></NavLink>
                  </li>
                </>
            }
          </ul>
          <div className="">
            <MenuBar showMenu={showMenu} active={active} />
          </div>
        </div>
      </div>

    </>
  )
}


export default Homenavebar;