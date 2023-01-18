import React, { useEffect } from 'react'
import { useNavigate, Outlet, NavLink } from 'react-router-dom'

const Bookpage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token-info')) {
            navigate('/login');
        }

    }, [])
    return (
        <>
            <main className='gap-2 p-1'>
                <section className='p-2'>
                    <nav className='flex justify-center gap-2'>
                        <NavLink to=''><li className='p-1 pl-7 pr-7 bg-black text-white rounded-md'>Create NewBook</li></NavLink>
                        <NavLink to='/books/update'><li className='p-1 pl-7 pr-7 bg-black text-white rounded-md'>Update/Remove Books</li></NavLink>
                    </nav>
                </section>
                <section className='p-1 h-[83.3vh]'>
                    <Outlet />
                </section>
            </main>
        </>
    )
}

export default Bookpage