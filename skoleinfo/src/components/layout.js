import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import React from 'react'

function Layout() {
    return (
        <>
        <div id="navbar">
            <div id="left-region">
            <Link to="./">Home</Link>
            </div>
            <div id="right-region">
                <Link to="./klubb">Klubber</Link>
                <Link to="./buss">Bussruta</Link>
            </div>
        </div>
        <div id="outlet">
            <Outlet />
        </div>
        </>
    )
}

export default Layout