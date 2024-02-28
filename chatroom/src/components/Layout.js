import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {
  return (
    <>
    <div id='navbar'>
      <Link id='link' to='/'>Home</Link>
      <Link id='link' to='/login'>Login</Link>
    </div>
    <div id="outlet">
        <Outlet />
    </div>
    </>
  )
}

export default Layout