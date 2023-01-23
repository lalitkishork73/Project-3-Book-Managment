import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAuth from '../hooks/auth';

const MenuBar = ({ showMenu, active }) => {
    const { auth, setAuth } = useAuth();

    const logout = () => {
        setAuth();
    }

    return (
        <>
            <nav className="relative h-full w-full">
                <ul
                    className={
                        active
                            ? "block  py-6 fixed inset-0 z-50 uppercase bg-black/20 backdrop-blur-lg md:hidden  text-center text-sm"
                            : "hidden"
                    }
                >
                    <FaWindowClose onClick={showMenu} className="mx-4 scale-120 " />
                    <li className=''>
                        <NavLink to='/'><h1 className='hover:text-yellow-200 hover:scale-105'>Home</h1></NavLink>
                    </li>
                    <li className=''>
                        <NavLink to='/books'><h1 className='hover:text-yellow-200 hover:scale-105'>Publish Books</h1></NavLink>
                    </li>
                    {
                        auth?.accessToken ?
                            <>
                                <li>
                                    <NavLink to="signup"><h1 className='hover:text-yellow-200 hover:scale-105' onClick={logout}>LogOut</h1></NavLink>
                                </li>
                            </>
                            : <>
                                <li className=' '>
                                    <NavLink to="login"><h1 className='hover:text-yellow-200 hover:scale-105'>LogIn</h1></NavLink>
                                </li>
                                <li>
                                    <NavLink to="signup"><h1 className='hover:text-yellow-200 hover:scale-105 '>SignUp</h1></NavLink>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </>
    );
};

export default MenuBar;