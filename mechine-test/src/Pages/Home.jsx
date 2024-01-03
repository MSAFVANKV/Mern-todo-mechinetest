import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import CreateList from '../Components/CreateList';

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate("/login");
    }
  },[])
  return (
    <div>
      <Header/>
      <CreateList/>
    </div>
  )
}

export default Home