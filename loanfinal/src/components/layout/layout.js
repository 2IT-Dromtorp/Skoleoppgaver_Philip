import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import DefaultProfile from '../../assets/default_profile.jpg';
import { jwtDecode } from 'jwt-decode';
import './css/layout.css';
import './css/navbar.css';
import './css/footer.css';

function Layout() {
    return (
        <div className='render'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout

function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const decodedToken = jwtDecode(token);
        const username = `${decodedToken.firstName} ${decodedToken.lastName}`;
        if (token) {
            setIsLoggedIn(true);
            setUsername(username);
        }
    })


    const logOut = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };
    

    return (
        <nav id='globalnav'>
            <div className='globalnav-content'>
                <ul className='globalnav-list'>
                    <li className='globalnav-item'><Link to='/' className='globalnav-link'><span className='globalnav-image-container'>
                        <svg height='32' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 44.18"><g><g><circle fill="transparent" r="17" cx="18" cy="20" />
                            <path xmlns="http://www.w3.org/2000/svg" fill="#0085ca" d="M28.984,28.984l.022,18.48c.01,8.729,6.935,19.475,17.978,25.7,11.044-6.226,17.969-16.972,17.979-25.7l.022-18.48Zm18,36c-3.348,0-6.062-.64-6.062-.868s2.714-.868,6.062-.868,6.063.64,6.063.868S50.333,64.983,46.984,64.983Zm0-4.652c-5.144,0-9.314-.935-9.314-1.334s4.17-1.334,9.314-1.334S56.3,58.6,56.3,59,52.129,60.332,46.984,60.332Zm0-5.4c-6.315,0-11.434-1.159-11.434-1.638s5.119-1.637,11.434-1.637S58.42,52.809,58.42,53.288,53.3,54.927,46.984,54.927ZM58.86,47.95a86.2,86.2,0,0,1-11.875.713A90.088,90.088,0,0,1,35.11,47.95c-.088-.017-.163-.07-.129-.154A34.208,34.208,0,0,1,46.82,32.307a.286.286,0,0,1,.329,0A34.208,34.208,0,0,1,58.989,47.8C59.021,47.88,58.948,47.931,58.86,47.95Z" transform="translate(-28.984 -28.984)" />
                        </g></g></svg>
                    </span></Link></li>
                    <li className='globalnav-item'><Link to='/loan' className='globalnav-link'><span className='globalnav-text-container'>Borrow equipment</span></Link></li>
                    {isLoggedIn ? (
                        <li className='globalnav-item'>
                            <Link to={`/account`} className='globalnav-link'>
                                <span className='globalnav-text-container'>
                                    <div className='globalnav-user'>
                                        <img draggable='false' className='globalnav-user-image' src={DefaultProfile} />
                                        {username}
                                        <button className='globalnav-logout' onClick={logOut}>Log out</button>
                                    </div>
                                </span>
                            </Link>
                        </li>
                    ) : (
                        <li className='globalnav-item'>
                            <Link to='/login' className='globalnav-link'>
                                <span className='globalnav-text-container'>
                                    Login
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

function Footer() {

    return (
        <footer id='globalfooter'>
            <div className='globalfooter-content'>
                <section className='globalfooter-info'>
                    <ul className='globalfooter-list'>
                        <li className='globalfooter-footnote'>Operating Hours: Mon-Fri, 9am-5pm</li>
                        <li className='globalfooter-footnote'>Contact Information: +47 12 34 56 78</li>
                        <li className='globalfooter-footnote'>FAQs: <Link style={{ color: '#0071E3', textDecoration: 'none' }}>Frequently Asked Questions</Link></li>
                    </ul>
                </section>
                <section className='globalfooter-legal'>
                    <div className='globalfooter-contact'>
                        <span className='globalfooter-text'>Ways to contact us: dromtorp@contact.no. Or call +47 12 34 56 78.</span>
                    </div>
                    <div className='globalfooter-legal-content'>
                        <p className='globalfooter-text'>Copyright © 2024 Drømtorp Lend. All rights reserved.</p>
                        <ul className='globalfooter-legal-list'>
                            <li className='globalfooter-item'><Link className='globalfooter-legal-link'>Privacy Policy</Link></li>
                            <li className='globalfooter-item'><Link className='globalfooter-legal-link'>Terms of Use</Link></li>
                            <li className='globalfooter-item'><Link className='globalfooter-legal-link'>Legal</Link></li>
                        </ul>
                        <p className='globalfooter-country'>Norway</p>
                    </div>
                </section>
            </div>
        </footer>
    )
}