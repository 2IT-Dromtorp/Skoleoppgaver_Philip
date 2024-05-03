import React, { useEffect, useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './login.css';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => {
        setEmailState(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    const doLogin = () => {
        const body = {
            email: email,
            password: password
        };
    
        fetch('/api/v1/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', true);
                navigate('/account');
            } else {
                console.log(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again.');
        });
    };      

    return (
        <main className='main'>
            <section className='login-section-module'>
                <div className='login-module-data-content'>
                    <div className='module-login-form'>
                        <span className='module-header'>Login</span>
                        <FancyInput placeholder='Email' type='email' value={email} onChange={handleEmail} />
                        <FancyInput placeholder='Password' type='password' value={password} onChange={handlePassword} />
                        <FancyButton text='Login' onClick={doLogin} />
                        <Link to="/signup" className='link'>Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login;