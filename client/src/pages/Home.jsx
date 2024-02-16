import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
       Welcome to Task Manager, Get Started With SignUp --
       
        
        <Link to="/signup" className="list-none text-xl cursor-pointer">
          Register
        </Link>
       
    </div>
  )
}

export default Home