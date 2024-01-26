import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {
  return (
    <>
      <div id='navbar'>
        <Link to="/login">Login</Link>
      </div>
      <div id='outlet'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout