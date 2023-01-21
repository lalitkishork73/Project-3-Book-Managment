import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { SiTeradata } from 'react-icons/si'
import useAuth from '../hooks/auth'


const inputS = 'rounded-sm p-2 border-b-2 text-sm focus:outline-teal-500'
const labelS = 'text-xs text-yellow-500'
const formsubS = 'flex flex-col'
const form = 'flex flex-col gap-3 w-[100%]'
const buton = 'p-2 text-white rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 '
const mainBody = 'flex justify-center items-center h-[100%] bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl'
const inputErr = 'text-xs text-red-500'
const inputF = 'hidden'

const ISBN_REGEX = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
const TEXT_REGEX = /^\W*/;
const FILE_REGEX = /\.(jpg|jpeg|png|gif)$/



const Newbook = () => {
    const URL = `http://localhost:3001/books`

    const { auth } = useAuth()

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

    const [category, setCategory] = useState("");
    const [validcategory, setValidCategory] = useState(false);
    const [categoryFocus, setCategoryFocus] = useState(false);

    const [subcategory, setSubCategory] = useState("");
    const [validSubcategory, setSubValidCategory] = useState(false);
    const [SubcategoryFocus, setSubCategoryFocus] = useState(false);

    const [date, setDate] = useState();

    const [file, setFile] = useState();
    const [validfile, setValifFile] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [post, setPost] = useState(false);
    const [success, setSuccess] = useState(false);


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
        setValidCategory(TEXT_REGEX.test(category));
    }, [category])

    useEffect(() => {
        setSubValidCategory(TEXT_REGEX.test(subcategory));
    }, [subcategory])

    useEffect(() => {
        if (file) {
            setValifFile(FILE_REGEX.test(file.name));
        }
    }, [file])

    useEffect(() => {
        setErrMsg('');
    }, [title, excerpt, isbn, category, subcategory, file])


    const Setdata = async (data) => {
        try {
            axios.defaults.headers.common = {
                "x-Api-key": auth?.accessToken
            }

            setPost(true);
            const response = await axios.post(`${URL}/${auth?.email}`, data)

            if (response?.data === undefined) {
                console.log('server error');
            }

            if (response?.data?.status === true) {
                setSuccess(true);
                setPost(false);
                setTitle('');
                setExcerpt('');
                setIsbn('');
                setCategory('');
                setSubCategory('');
                setFile('');
                setDate('');
                setTimeout(() => {
                    setSuccess(false);
                }, 6000);
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



    const submit = (e) => {
        e.preventDefault()

        const v1 = ISBN_REGEX.test(isbn);
        const v2 = TEXT_REGEX.test(excerpt);
        const v3 = TEXT_REGEX.test(category);
        const v4 = TEXT_REGEX.test(title);
        const v5 = TEXT_REGEX.test(subcategory);
        const v6 = FILE_REGEX.test(file.name);

        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
            setErrMsg('Invalid Entry!');
            return;
        }


        const formdata = new FormData();

        formdata.append('title', title);
        formdata.append('excerpt', excerpt);
        formdata.append('ISBN', isbn);
        formdata.append('category', category);
        formdata.append('subcategory', subcategory);
        formdata.append('releasedAt', date);
        formdata.append('bookCover', file);

        Setdata(formdata)

        // for (let value of formdata.values()) {
        //     console.log(value);
        // }
    }



    return (
        <>
            <main className={mainBody}>
                <section className=' p-4 rounded-xl w-[30%] bg-white'>
                    <div className='w-[100%]'>
                        <form className={form}>
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
                                <p className={titleFocus && title && !validtitle ? inputErr : inputF}>Please </p>
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
                                <p className={excerptFocus && excerpt && !validexcerpt ? inputErr : inputF}>love is killer</p>
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
                            <div className={formsubS}>
                                <label htmlFor="category" className={labelS}>Category</label>
                                <input type="text" id="category" placeholder='Category'
                                    className={inputS}
                                    required
                                    autoComplete='off'
                                    focused="true"
                                    onFocus={() => { setCategoryFocus(true) }}
                                    onBlur={() => { setCategoryFocus(false) }}
                                    value={category}
                                    onChange={(e) => { setCategory(e.target.value) }} />
                                <p className={categoryFocus && category && !validcategory ? inputErr : inputF}>love is killer</p>
                            </div>
                            <div className={formsubS}>
                                <label htmlFor="subcategory" className={labelS}>Subcategory</label>
                                <input type="text" id="subcategory" placeholder='Subcategory'
                                    className={inputS}
                                    required
                                    autoComplete='off'
                                    focused="true"
                                    onFocus={() => { setSubCategoryFocus(true) }}
                                    onBlur={() => { setSubCategoryFocus(false) }}
                                    value={subcategory}
                                    onChange={(e) => { setSubCategory(e.target.value) }} />
                                <p className={SubcategoryFocus && subcategory && !validSubcategory ? inputErr : inputF}>love is killer</p>
                            </div>
                            <div>
                                <label htmlFor="bookcover" className={labelS}>BookCover</label>
                                <input type="file" name="file" id='bookcover'
                                    className='block w-full text-sm text-slate-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-yellow-50 file:text-yellow-500    
                                                        hover:file:bg-yellow-100' onChange={(e) => { setFile(e.target.files[0]) }} />
                                <p className={file && !validfile ? inputErr : inputF}>File Should Be Image</p>
                            </div>
                            <div>
                                <input type="date" name="date" className='w-full
                                                        mr-4 py-2 px-4
                                                        rounded-full border-0
                                                        text-sm font-semibold
                                                        bg-yellow-50 text-yellow-500    
                                                        hover:bg-yellow-100
                                                        uppercase text-center'
                                    value={date} onChange={(e) => { setDate(e.target.value) }} />
                            </div>
                            <div className="flex justify-center">
                                <button className={buton} onClick={submit}>Submit</button>
                            </div>
                            <div>
                                {
                                    !post ? <><p className='text-red-400 text-center'>{errMsg}</p></> : <div className="flex flex-col justify-center items-center">
                                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-cyan-400 border-b-white rounded-full" role="status">
                                        </div></div>
                                }
                                {
                                    success ? <>
                                        <p className='text-green-500 text-center text-sm'>success!</p>
                                    </> : <></>
                                }
                            </div>

                        </form>
                    </div>
                </section>
            </main >
        </>
    )
}

export default Newbook