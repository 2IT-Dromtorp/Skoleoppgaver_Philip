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
        console.log('Login');
    };

    return (
        <main className='main'>
            <section className='login-section-module'>
                <div className='login-module-data-content'>
                    <div className='module-login-form'>
                        <span className='module-header'>Login</span>
                        <FancyInput type='text' placeholder='Email*' value={email} onChange={handleEmail} />
                        <FancyInput type='password' placeholder='Password*' value={password} onChange={handlePassword} />
                        <FancyButton name='Login' onClick={doLogin} />
                        <Link to="/signup" id='link'>Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login;