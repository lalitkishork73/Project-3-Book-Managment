import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/auth'
import axios from '../hooks/axios';
// import bg from '../assets/bg-auth.jpg';

const inputT = `text-red-500 text-xs mt-1 p-1 bg-black rounded-xl `
const inputF = `absolute left-[-9999px]`
const formsubS = 'flex flex-col'
const labelS = 'text-xs text-white'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;



const Loginpage = () => {
    const url = `Login`;
    const userRef = useRef();
    const errRef = useRef();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [errmsg, setErrmsg] = useState('');


    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setErrmsg('')

    }, [email, password])
    let data = {
        email: email,
        password: password
    }

    const setData = async () => {
        try {
            const response = await axios.post(url, data);
            const accessToken = response?.data?.data;
            // console.log(accessToken)

            setAuth({ email, accessToken })
            navigate(from, { replace: true });

            //  setAuth({ email, password, roles, accessToken });
            // const roles = response?.data?.roles;
            // setUser('');
            // setPwd('');


        }
        catch (err) {
            if (!err?.response) {
                setErrmsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrmsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrmsg('Unauthorized');
            } else {
                setErrmsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const login = (e) => {
        e.preventDefault();
        setData();
    }



    return (
        <>

            <div className="flex justify-center items-center h-[90vh] bg-[url('/src/assets/bg-auth.jpg')]">
                <div className='w-auto h-auto rounded-lg bg-black/70 backdrop-blur-sm p-5 text-white drop-shadow-lg'>
                    <div>
                        <p ref={errRef} className={errmsg ? 'text-red-500 text-center text-sm       ' : ''}
                            aria-live="assertive">{errmsg}</p>
                        <form className='flex flex-col gap-5 p-5 rounded-lg'>
                            <div className={formsubS}>
                                <label htmlFor="user" className={labelS}>Username</label>
                                <input type="text" placeholder='Username' className='p-1 rounded-md bg-transparent border-b-2 text-green-500' value={email} onChange={(e) => { setEmail(e.target.value) }}
                                    id="user"
                                    ref={userRef}
                                    required
                                    autoComplete='off'
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="userNote"
                                    onFocus={() => { setEmailFocus(true) }}
                                    onBlur={() => { setEmailFocus(false) }}

                                />
                                <p className={!validEmail && emailFocus && email ? inputT : inputF}>please Enter valid userName</p>
                            </div>
                            <div className={formsubS}>
                                <label htmlFor="user" className={labelS}>Password</label>
                                <input type="Password" placeholder='Password' className='p-1 rounded-md bg-transparent border-b-2 text-green-500' value={password} onChange={(e) => { setPassword(e.target.value) }}
                                    aria-describedby="passNote"
                                    aria-invalid={validPassword ? "false" : "true"}
                                    onFocus={() => { setPasswordFocus(true) }}
                                    onBlur={() => { setPasswordFocus(false) }}
                                />
                                <p id="passNote" className={!validPassword && passwordFocus && password ? inputT : inputF}>please Enter valid password</p>
                            </div>
                            <div className='flex justify-center p-3'>
                                <button onClick={login} className='p-1 pl-5 pr-5 bg-red-500 rounded-md text-white'>Login</button>
                            </div>
                            <p className='text-white'>If you don't have account?<Link to='/signup'>&nbsp;<span className='text-cyan-400'>Signup</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginpage;