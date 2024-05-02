import React, { useEffect, useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './login.css';
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
        const body = JSON.stringify({
            email: email,
            password: password
        });
        fetch('/api/v1/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const user = data.user;
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('userId', user._id);
                    navigate(`/account/${user._id}`);
                } else {
                    console.error('Login failed:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <main className='main'>
            <section className='login-section-module'>
                <div className='login-module-data-content'>
                    <div className='module-login-form'>
                        <span className='module-header'>Login</span>
                        <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                        <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                        <FancyButton name='Login' onClick={doLogin} />
                        <Link to="/signup" id='link'>Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login;
