import React from 'react'
import { Outlet } from 'react-router-dom'

function Template() {
    return (
        <div id='window'>
            <Outlet />
        </div>
    )
}

export default Template
