import React from 'react';
import { userMenu } from './Menus/userMenus';
import { useLocation, Link } from 'react-router-dom';
import '../../../styles/Layout.css';

const Sidebar = () => {
  const location = useLocation();
  
  return (
      <div className='sidebar'>
          <div className='menu'>
              {userMenu.map((menu, index) => {
                  const isActive = location.pathname === menu.path;
                  return (
                      <div key={index} className={`menu-item ${isActive ? 'active' : ''}`} >
                          <i className={menu.icon}></i>
                          <Link to={menu.path}>{menu.name}</Link>
                      </div>
                  );
              })}
          </div>
      </div>
  );
};


export default Sidebar;
