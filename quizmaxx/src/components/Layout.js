import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div id='navbar'>
                <div id='left-region'>
                    <Link to="/leaderboard">Leaderboard</Link>
                </div>
                <div id='right-region'>
                    <Link to="/quiz">Quiz</Link>
                </div>
            </div>
            <div id='outlet'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout