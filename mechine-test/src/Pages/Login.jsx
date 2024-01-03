import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { LoginRoute } from '../Utils/ApiRoutes';

function Login() {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        username:'',
        password:""
    });

    useEffect(() => {
        if(localStorage.getItem("token")) {
          navigate("/");
        }
      },[])
    const toastOptions = {
        position: "bottom-right",
        autoClose: "8000",
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleChange = (e) =>{
        setUserLogin({...userLogin,[e.target.name]: e.target.value})
    }

    const handleValidation = () =>{
        const {username, password} = userLogin
        if(username === ''){
             toast.error("Username is required!", toastOptions);
             return false

        } else if (password === ""){
             toast.error("Password is required!", toastOptions);
             return false
        }
        return true
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {username, password} = userLogin
            const {data} = await axios.post(LoginRoute,{
                username, password
            })
            if(data.status === false){
                    toast.error(data.msg,toastOptions)
            }
            if(data.status === true){
                localStorage.setItem("token",JSON.stringify(data.user._id))
                navigate("/")
        }
        }

    }

  return (
   <>
    <ToastContainer />
    <div className='container'>
        <form onSubmit={(event) =>handleSubmit(event)}>
            <h1>Login</h1>
            <input type="text" 
            placeholder='Add Username'
            name='username'
            onChange={(e)=>{handleChange(e)}}
            />

            <input type="password" 
            placeholder='Password here'
            name='password'
            onChange={(e)=>{handleChange(e)}}
            />

            <button type='submit'>Login</button>
            <Link to='/register'>Don't have an Account?Register Here!</Link>
        </form>
    </div>
   </>
  )
}

export default Login