import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../modules/navbar/navbar.js'

function Template() {
    return (
        <div id='window'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Template