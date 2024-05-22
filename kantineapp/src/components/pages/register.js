import React, { useState } from 'react';
import './styles/register.css'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfPassword = (e) => setConfPassword(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);

    const register = () => {
        const body = { name, email, password, confPassword, phone };

        if (password !== confPassword) {
            alert("Passwords do not match");
            return;
        }

        fetch('http://localhost:8080/api/v1/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = '/login';
                } else {
                    console.log(data);
                    alert(data.error);
                }
            })
            .catch((error) => {
                console.error('Network error:', error);
            });
    };

    return (
        <main id='page-render'>
            <div id='register-render'>
                <input className='input' type='text' value={name} onChange={handleName} placeholder="Name" />
                <input className='input' type='text' value={email} onChange={handleEmail} placeholder="Email" />
                <input className='input' type='password' value={password} onChange={handlePassword} placeholder="Password" />
                <input className='input' type='password' value={confPassword} onChange={handleConfPassword} placeholder="Confirm Password" />
                <input className='input' type='tel' value={phone} onChange={handlePhone} placeholder="Phone" />
                <button className="logreg-button" onClick={register}>Register</button>
            </div>
        </main>
    );
}

export default Register;
