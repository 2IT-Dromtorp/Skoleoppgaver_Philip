import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import HFDLogo from "../images/HFDLogo.png"

const Layout = (props) => {
    return (
        <>
            <div id='navbar'>
                <Link to="">VTH</Link>
                <Link to="./mytickets">Tickets</Link>
            </div>
            <div id='outlet'>
                <Outlet />
            </div>
            <div id='footer'>
                <div id='footer-infobox'>
                    <span>Facebook</span>
                    <span>Instagram</span>
                    <span>Linkedin</span>
                </div>
                <div id='footer-infobox'>
                    <span>vitrengerhjelp@vth.com</span>
                    <span>+47 12345678</span>
                    <span>Gokkvei 43</span>
                    <span>1923 Gokk</span>
                    <span>Norway</span>
                </div>
                <div id='footer-infobox'>
                    <span>...</span>
                </div>
            </div>
        </>
    )
}

export default Layout;