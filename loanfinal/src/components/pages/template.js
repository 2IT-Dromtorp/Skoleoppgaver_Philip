import React from 'react'
import { Outlet } from 'react-router-dom'

function Template() {
    return (
        <div id='template'>
            <Outlet />
        </div>
    )
}

export default Template