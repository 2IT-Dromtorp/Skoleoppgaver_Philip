import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import Select from './Select';
import Update from './Update';
import Insert from './Insert';
import Delete from './Delete';

const Layout = () => {
    return (
        <>
            <div id='navbar'>
            <Link to='/' >Home</Link>
            <Link to='select' >Select</Link>
            <Link to='update' >Update</Link>
            <Link to='insert' >Insert</Link>
            <Link to='delete' >Delete</Link>
            </div>
            <div id='outlet'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout;