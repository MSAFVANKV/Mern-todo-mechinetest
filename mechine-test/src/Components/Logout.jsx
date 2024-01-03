import React from 'react';
import {BiPowerOff} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate()
    const logout = ()=> {
        if(localStorage.getItem("token")){
            localStorage.clear()
            navigate("/login")
        }
    }
  return (
    <div>
        <button onClick={logout}><BiPowerOff /></button>
    </div>
  )
}

export default Logout