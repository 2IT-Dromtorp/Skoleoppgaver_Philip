import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout({ isLoggedIn, username, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('login')
  };

  return (
    <>
      <div id='navbar_top'>
        <div id='navbar_left_region'>
          <Link to='/'>Logo</Link>
        </div>
        <div id='navbar_right_region'>
          {isLoggedIn ? (
            <>
              <Link to='/account'>Hei, @{username}</Link>
              <a href='' onClick={handleLogoutClick}>Logg ut</a>
            </>
          ) : (
            <Link to='/login'>Logg in</Link>
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
