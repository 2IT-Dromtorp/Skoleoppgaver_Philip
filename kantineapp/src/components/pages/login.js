import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.css'

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const login = () => {
        const body = {
            email: email,
            password: password
        }
        fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const user = data.user
                    localStorage.setItem('loginStatus', true);
                    localStorage.setItem('userId', user._id)
                    localStorage.setItem('name', user.name)
                    localStorage.setItem('email', user.email)
                    navigate(`/profile/${user._id}`)
                } else {
                    alert(data.error);
                }
            })

    }

    return (
        <main id='page-render'>
            <div id='login-render'>
                <input className='input' type='text' onChange={handleEmail} value={email} placeholder='Email' />
                <input className='input' type='password' onChange={handlePassword} value={password} placeholder='Password' />
                <button className="logreg-button" onClick={login}>Login</button>
            </div>
        </main>
    )
}

export default Login