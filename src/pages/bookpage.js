import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Bookpage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token-info')){
            navigate('/login');
        }

    },[])
    return (
        <>
        you have been successFully loggedin
        </>
    )
}

export default Bookpage