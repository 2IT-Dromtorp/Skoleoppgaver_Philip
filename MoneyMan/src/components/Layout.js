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
      <div id='navbar'>
        <div id='leftRegion'>
          <Link to='/'>Logo</Link>
        </div>
        <div id='rightRegion'>
          {isLoggedIn ? (
            <>
              <Link id="link" to='/account'>Hei, @{username}</Link>
              <a id='link' href='' onClick={handleLogoutClick}>Logg ut</a>
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
