import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import axios from '../hooks/axios';
const labelS = 'text-xs text-yellow-500'
const inputS = 'rounded-sm p-2 border-b-2 text-sm focus:outline-teal-500 bg-transparent'
const inputT = `text-red-500 text-xs p-1 bg-black rounded-xs `
const inputF = `hidden`
const div = `flex flex-col`
const TEXT_REGEX = /^\W*/;
// const USER_REGEX = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{3,23}$/g;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([-]?)\d{3}([-]?)\d{4})$/;


const Signuppage = () => {
    const userRef = useRef(0);
    const errRef = useRef();

    const [name, setName] = useState();
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [phone, setPhone] = useState();
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [title, settitle] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [pincode, setPincode] = useState();


    const [password, setPassword] = useState();
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [post, setPost] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(TEXT_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd)
    }, [password, matchPwd])


    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [name, password, matchPwd, email, phone])


    const url = `http://localhost:3001/register`;

    const postDat = async (formData) => {
        try {
            setPost(true);
            const response = await axios.post(url, formData)
            // console.log("res", response.data);

            if (response?.data?.status === true) {
                setSuccess(true);
                setPost(false);
                setName('');
                setPassword('');
                setPhone('');
                setEmail('');
                settitle();
                setCity('');
                setStreet('');
                setPincode('');

            }


        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setPost(false);
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();

        }
    }
    const setData = (e) => {
        e.preventDefault();

        const v1 = TEXT_REGEX.test(name);
        const v2 = PWD_REGEX.test(password);
        const v3 = PHONE_REGEX.test(phone);
        const v4 = EMAIL_REGEX.test(email);


        console.log(v1, v2, v1 || v2)
        if (!v1 || !v2 || !v3 || !v4 || !title || !street || !city || !pincode) {
            setErrMsg('Invalid Entry!');
            return;
        }

        const address = {
            street, city, pincode
        }

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('title', title);
        formData.append('address', JSON.stringify(address));
        formData.append('password', password);


        // for (let value of formData.values()) {
        //     console.log(value);
        // }
        postDat(formData);
        // alert("submitted");
        // console.log(Data);
    }

    return (
        <>

            <div className="flex justify-center items-center h-[90vh] bg-[url('/src/assets/bg-auth.jpg')]">
                {success ? <section className='rounded-lg bg-black/70 flex flex-col p-5 text-white'>
                    <h1 className='text-2xl'>SuccessFully Created Account</h1>
                    <p className='text-green-500'><Link to='/login'> please Login now</Link></p>
                </section> :
                    <div className='w-auto h-auto rounded-lg bg-black/70 backdrop-blur-sm p-5 drop-shadow-lg '>
                        <form className='p-3 flex flex-col text-white text-sm'>
                            <h1 className='text-center font-bold'>SignUp</h1>
                            <div className={div}>
                                <label htmlFor='nam' className={labelS}>Name</label>
                                <input type='text' placeholder='Name' value={name} id="nam" onChange={(e) => { setName(e.target.value) }} className={inputS}
                                    ref={userRef}
                                    autoComplete="off"
                                    required
                                    focused="true"
                                    onFocus={() => { setUserFocus(true) }}
                                    onBlur={() => { setUserFocus(false) }}
                                />
                                <p id="uidnote" className={userFocus && name && !validName ? inputT : inputF}>
                                    <span>name should be valid! </span>
                                </p>
                            </div>

                            <div className={div}>
                                <label className={labelS} htmlFor='phone'>Phone</label>
                                <input type='text' placeholder='Phone' id='phone' value={phone} onChange={(e) => { setPhone(parseInt(e.target.value)) }} className={inputS}
                                    autoComplete="off"
                                    required
                                    aria-invalid={validPhone ? "false" : "true"}
                                    aria-describedby="phonenote"
                                    onFocus={() => { setPhoneFocus(true) }}
                                    onBlur={() => { setPhoneFocus(false) }}
                                />
                                <p id="phonenote" className={phone && phoneFocus && !validPhone ? inputT : inputF}>
                                    Phone Number Must be valid
                                </p>
                            </div>

                            <div className={div}>
                                <label className={labelS} htmlFor='email'>Email</label>
                                <input type='text' placeholder='Email' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className={inputS}
                                    autoComplete="off"
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => { setEmailFocus(true) }}
                                    onBlur={() => { setEmailFocus(false) }}
                                />
                                <p id="emailnote" className={emailFocus && email && !validEmail ? inputT : inputF}>
                                    Email must be valid example1@email.com
                                </p>
                            </div>

                            <div className={div}>
                                <label className={labelS} htmlFor='title'>Title</label>
                                <select className='bg-transparent text-gray-400 p-2' id='title' onChange={(e) => { settitle(e.target.value) }} >
                                    <option value="" selected disabled hidden>Choose Title Here</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                </select>
                            </div>

                            <div className={div}>
                                <label htmlFor='address' className={labelS}>Address</label>
                                <input type='text' placeholder='Street' className={inputS} id='address  ' value={street} onChange={(e) => { setStreet(e.target.value) }} />
                                <input type='text' placeholder='City' className={inputS} value={city} onChange={(e) => { setCity(e.target.value) }} />
                                <input type='text' placeholder='Pincode' className={inputS} value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                            </div>

                            <div className={div}>
                                <label htmlFor='password' className={labelS}>Password</label>
                                <input type='password' placeholder='Password' id='password' className={inputS} value={password} onChange={(e) => { setPassword(e.target.value) }}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)} />
                                <p id="pwdnote" className={passwordFocus && !validPassword ? inputT : inputF}>

                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase <br />letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <div className={div}>
                                <label htmlFor='password' className={labelS}>Confirm Password</label>
                                <input
                                    type="password"
                                    className={inputS}
                                    placeholder="Confirm password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? inputT : inputF}>
                                    Must match the first password input field.
                                </p>
                            </div>
                            <div className='flex justify-center mt-6'>
                                <button onClick={setData} className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-3 rounded-lg w-32'>SignUp</button>
                            </div>
                            <div>
                                {
                                    !post ? <><p className='text-red-400 text-center'>{errMsg}</p></> : <div className="flex flex-col justify-center items-center">
                                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-cyan-400 border-b-transparent mt-1 rounded-full" role="status">
                                        </div></div>
                                }
                            </div>
                            <p className='mt-5'>Have you already account? <NavLink to='/login' className='text-cyan-500'>Login</NavLink> </p>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Signuppage;
