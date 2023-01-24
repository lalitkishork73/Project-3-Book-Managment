import React from 'react'
import { Link } from 'react-router-dom'
import { SiBookstack } from 'react-icons/si'

const Footer = () => {
    const date = new Date();
    return (
        <>
            <footer className='flex bg-black p-2 justify-center'>
                <div className='ml-9 p-2'>
                    <Link to='/'><h1 className='font-bold text-yellow-300'>Book's Lab</h1></Link>
                </div>
                <div className='p-2 scale-110'>
                    <SiBookstack className='text-yellow-300' />
                </div>
                <div className='text-white p-2'>
                    <p className='text-xs'>
                        Copyright © {date.getFullYear()}     Book's Lab. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer