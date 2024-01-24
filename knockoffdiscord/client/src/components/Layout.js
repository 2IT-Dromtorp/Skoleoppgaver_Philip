import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {

    return (
        <>
            <div id='navbar'>
                <Link to="./home">Home</Link>
                <Link to="./chat">Chat</Link>
            </div>
            <div id='outlet'>
                <Outlet />
            </div>
            <div id='footer'>
            </div>
        </>
    )
}

export default Layout;