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

        console.log(body);
        fetch('/api/v1/accounts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setTimeout(() => {
                        navigate(`/account/${data.user_id}`);
                        localStorage.setItem('loggedIn', true);
                        localStorage.setItem('email', email);
                        localStorage.setItem('id', data.user_id);
                    }, 2000)
                }
            })
    }

    return (
        <div className='window' id='login'>
            <div className='form'>
                <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                <FancyButton name='Login' onClick={doLogin} />
                <Link to="/signup" id='link'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Login;
