import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { RegisterRoute } from '../Utils/ApiRoutes';

function Register() {
    const navigate = useNavigate()
    const [userRegister, setUserRegister] = useState({
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
        setUserRegister({...userRegister,[e.target.name]: e.target.value})
    }

    const handleValidation = () =>{
        const {username, password} = userRegister
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
            const {username, password} = userRegister
            const {data} = await axios.post(RegisterRoute,{
                username, password
            })
            if(data.status === false){ 
                    toast.error(data.msg,toastOptions)
            }
            if(data.status === true){
                localStorage.setItem("token",JSON.stringify(data.newUser._id))
                navigate("/")
        }
        }

    }

  return (
   <>
    <ToastContainer />
    <div className='container'>
        <form onSubmit={(event) =>handleSubmit(event)}>
            <h1>Register</h1>
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

            <button type='submit'>Register</button>
            <Link to='/login'>Already have an Account?Login Here!</Link>
        </form>
    </div>
   </>
  )
}

export default Register