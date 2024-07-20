import React from 'react'
import  { BiDonateBlood }  from "react-icons/bi"
import { FaUserCircle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const Header = () => {
  // logout 
  const navigate = useNavigate()
  const Logouthandle = () => {
    localStorage.clear();
    navigate('/login');
    
  };
  
  return (
    <>
      <nav className='navbar'>
        <div className='container-fluid'>
          <div className='navbar-brand mx-2'><BiDonateBlood color='red'/>BLOOD BANK 🩸</div>
          <ul className='navbar-nav flex-row'>
            <li className='nav-items mx-3'>
              <p className='nav-link'>
                <FaUserCircle/>Welcome
              </p>
            </li>

            <li className='nav-items mx-3'>
              <button className='btn btn-danger' onClick={Logouthandle}>Logout</button>
            </li>
          
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
