import React, { useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import './signup.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\-|]+$/;
        return passwordRegex.test(password);
    };

    const signUp = async () => {
        if (!isValidEmail(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            setMessage('Password can only contain standard characters.');
            return;
        }

        const body = JSON.stringify({
            email: email,
            password: password
        });

        fetch('/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                setMessage('Failed to create user');
            });
    };

    const handleEmail = (event) => {
        setEmail(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    return (
        <div className='signup'>

            <div className='form'>
                <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                <FancyInput type='password' placeholder='Create password' value={password} onChange={handlePassword} />
                <button onClick={signUp}>Sign up</button>
                <div>{message}</div>
            </div>
        </div>
    );
}

export default Signup;
