import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from '../images/MoneyMan.png';

function Layout({ isLoggedIn, username, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('login')
  };

  return (
    <>
      <div id='navbar'>
        <div id='left-region'>
          <Link to='/'><img id="logo" src={Logo} /></Link>
        </div>
        <div id='right-region'>
          {isLoggedIn ? (
            <>
              <Link id="link" to='/account'>Hei, @{username}</Link>
              <a id='link' onClick={handleLogoutClick}>Logg ut</a>
            </>
          ) : (
            <Link id='link' to='/login'>Logg in</Link>
          )}
        </div>
      </div>
      <div id="outlet">
        <Outlet />
      </div>
    </>
  )
}

export default Layout;
