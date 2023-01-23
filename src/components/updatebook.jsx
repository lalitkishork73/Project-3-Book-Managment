import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import useAuth from '../hooks/auth'

const inputS = 'rounded-sm p-2 border-b-2 text-sm focus:outline-teal-500'
const labelS = 'text-xs text-yellow-500'
const formsubS = 'flex flex-col'
const form = 'flex flex-col gap-3 w-[100%]'
const buton = 'p-2 text-white rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 '
const inputErr = 'text-xs text-red-500'
const inputF = 'hidden'


const ISBN_REGEX = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
const TEXT_REGEX = /^\W*/;



const Updatebook = ({ showMenuUpdate, active, Id }) => {
    console.log(Id)
    const firstref = useRef(0);
    const errRef = useRef();

    const [title, setTitle] = useState("");
    const [validtitle, setValidtitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [excerpt, setExcerpt] = useState("");
    const [validexcerpt, setValidExcerpt] = useState(false);
    const [excerptFocus, setexcerptFocus] = useState(false);

    const [isbn, setIsbn] = useState("");
    const [validIsbn, setValidISBN] = useState(false);
    const [isbnfocus, setIsbnFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [post, setPost] = useState(false);
    const [success, setSuccess] = useState(false);

    const [test, setTest] = useState(false)
    const { auth } = useAuth();
    const URL = `http://localhost:3001/books/${Id}`



    useEffect(() => {
        firstref.current.focus();
    }, [])

    useEffect(() => {
        setValidtitle(TEXT_REGEX.test(title));
    }, [title])

    useEffect(() => {
        setValidExcerpt(TEXT_REGEX.test(excerpt));
    }, [excerpt])

    useEffect(() => {
        setValidISBN(ISBN_REGEX.test(isbn));
    }, [isbn])



    useEffect(() => {
        setErrMsg('');
    }, [title, excerpt, isbn])

    const submit = (e) => {
        e.preventDefault()

        // const v1 = ISBN_REGEX.test(isbn);
        // const v2 = TEXT_REGEX.test(excerpt);
        // const v3 = TEXT_REGEX.test(title);


        // if (!v1 || !v2 || !v3) {
        //     setErrMsg('Invalid Entry!');
        //     return;
        // }


        const formdata = new FormData();

        formdata.append('title', title);
        formdata.append('excerpt', excerpt);
        formdata.append('isbn', isbn);
        Setdata(formdata)

        // for (let value of formdata.values()) {
        //     console.log(value);
    }

    const Setdata = async (data) => {
        try {
            setPost(true);
            axios.defaults.headers.common = {
                "x-Api-key": auth?.accessToken
            }
            const res = await axios.put(URL, data)
            console.log(res)
            if (res?.data?.status == true) {
                setSuccess(true);
                setPost(false);
                setTitle('');
                setExcerpt('');
                setIsbn('');
            }


        }
        catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <div className={active
                ? 'absolute w-screen inset-0 h-[94vh] bg-black/70 backdrop-blur-sm flex justify-center items-center'
                : "hidden"}>
                <div className="w-1/2 ">
                    <p>

                        <FaWindowClose onClick={showMenuUpdate} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                showMenuUpdate()
                            }

                        }} className="mx-4 scale-120 text-center mb-2 text-red-500 rounded-sm" />&nbsp; <span className='text-white'>ENTER</span>
                    </p>

                    <section className=' p-4 rounded-xl w-[100%] bg-white'>
                        <div className='w-[100%]'>
                            <form className={form}>
                                <h1 className='text-center font-bold'>Update Books Details</h1>
                                <div className={formsubS}>
                                    <label htmlFor="title" className={labelS}>Title</label>
                                    <input type="text" id="title" placeholder='Title' className={inputS} ref={firstref}
                                        required
                                        autoComplete='off'
                                        focused="true"
                                        onFocus={() => { setTitleFocus(true) }}
                                        onBlur={() => { setTitleFocus(false) }}
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}

                                    />
                                    <p className={titleFocus && title && !validtitle ? inputErr : inputF}>Please Provide valid Title</p>
                                </div>
                                <div className={formsubS}>
                                    <label htmlFor="excerpt" className={labelS}>Excerpt</label>
                                    <input type="text" id="excerpt" placeholder='Excerpt'
                                        className={inputS}
                                        required
                                        autoComplete='off'
                                        focused="true"
                                        onFocus={() => { setexcerptFocus(true) }}
                                        onBlur={() => { setexcerptFocus(false) }}
                                        value={excerpt}
                                        onChange={(e) => { setExcerpt(e.target.value) }} />
                                    <p className={excerptFocus && excerpt && !validexcerpt ? inputErr : inputF}>Please provide valid Excerpt</p>
                                </div>
                                <div className={formsubS}>
                                    <label htmlFor="isbn" className={labelS}>ISBN</label>
                                    <input type="text" id="isbn" placeholder='ISBN'
                                        className={inputS}
                                        required
                                        autoComplete='off'
                                        focused="true"
                                        onFocus={() => { setIsbnFocus(true) }}
                                        onBlur={() => { setIsbnFocus(false) }}
                                        value={isbn}
                                        onChange={(e) => { setIsbn(e.target.value) }} />
                                    <p className={isbnfocus && isbn && !validIsbn ? inputErr : inputF}>ISBN no. should me like this 1215-562-263</p>
                                </div>
                                <div className="flex justify-center">
                                    <button className={buton} onClick={submit}>Update</button>
                                </div>
                                <div>
                                    {
                                        !post ? <><p className='text-red-400 text-center'>{errMsg}</p></> : <div className="flex flex-col justify-center items-center">
                                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-cyan-400 border-b-white rounded-full" role="status">
                                            </div></div>
                                    }
                                    {
                                        success ? <>
                                            <p className='text-center text-green-500 text-sm'>success!</p>
                                        </> : <></>
                                    }
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Updatebook