import React, { useEffect } from 'react'
import { useNavigate, Outlet, NavLink } from 'react-router-dom'

const Bookpage = () => {

    return (
        <>
            <main className='gap-2 p-1'>
                <section className='p-2'>
                    <nav className='flex justify-center gap-2'>
                        <NavLink to=''><li className='p-1 pl-7 pr-7 bg-black text-white rounded-md'>Create NewBook</li></NavLink>
                        <NavLink to='/books/update'><li className='p-1 pl-7 pr-7 bg-black text-white rounded-md'>Update/Remove Books</li></NavLink>
                    </nav>
                </section>
                <section className='p-1 h-[84vh] bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r rounded-xl overflow-y-auto'>
                    <Outlet />
                </section>
            </main>
        </>
    )
}

export default Bookpage