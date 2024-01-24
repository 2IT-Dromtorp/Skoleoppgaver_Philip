import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import Logo from "../images/VikenLogoWhite.png";
import Contact from "../images/Aktiv-11.png";
import Address from "../images/Aktiv-12.png";
import About from "../images/Aktiv-13.png";

const Layout = (props) => {
    const { loggedIn, email, setEmail, setLoggedIn } = props
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            setLoggedIn(false)
            setEmail("")
            localStorage.setItem('loggedIn', 'false');
            localStorage.setItem('email', '');
            toast.success("Bruker logget ut")
        }
    }

    const changeColorTheme = () => {
        const isDarkMode = document.body.classList.contains('dark-mode');

        document.body.classList.toggle('dark-mode');

        localStorage.setItem('darkMode', !isDarkMode);
    }

    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedDarkMode && storedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    return (
        <>
            <div id='navbar'>
                <Link to="./home"><img src={Logo}></img></Link>
                <div id='profile-container'>{(loggedIn ? <div>
                    Velkommen, {email}
                </div> : "")}<button
                    id='goToLogin'
                    onClick={() => {
                        if (loggedIn) {
                            onButtonClick();
                        } else {
                            navigate('./login');
                        }
                    }}
                    className="button"
                >
                        {loggedIn ? "Logg ut" : "Logg inn"}
                    </button>

                </div>
            </div>
            <div id='outlet'>
                <Outlet />
            </div>
            <div id='footer'>
                <div id='footer-infocontainer'>
                    <div id='footer-box'><img src={Contact} /><h2>Kontakt</h2><p>Mail: dromtorp@viken.no</p><p>Telefon: 12 34 56 78</p></div>
                    <div id='footer-box'><img src={Address} /><h2>Adresse</h2><p>Skomakergata 69B, 0123 Gokk</p></div>
                    <div id='footer-box'><img src={About} /><h2>Drømtorp Kurs</h2><p>Drømtorp kurs har kurs som er tilpasset deg og dine behov til en fornuftig pris.</p></div>
                </div>
            </div>
            <div id='botnav'>{/*<button onClick={changeFontSize}>ᴀ/A</button>*/}
                <button id='themeBtn' onClick={changeColorTheme}>🟡/⚫</button></div>
                <Toaster />
        </>
    )
}

export default Layout;