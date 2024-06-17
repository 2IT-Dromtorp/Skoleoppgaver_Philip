import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fancyinput from '../fancyinput/fancyinput';
import Fancybutton from '../fancybutton/fancybutton';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const handlePhoneNumber = (e) => setPhoneNumber(e.target.value)

    const register = () => {
        const body = { name, email, phoneNumber, password, confirmPassword };

        console.log(body)

        fetch('/api/v1/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data.success) {
                    console.log(data);
                    navigate('/login');
                } else {
                    alert(data.error);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error:', error);
            });
    }

    return (
        <div className='page-wrapper'>
            <main className='main-container'>
                <section className='content-wrapper'>
                    <div className='title-wrapper'>
                        <h1 className='title'>Welcome</h1>
                    </div>
                    <div className='login-container'>
                        <Fancyinput type='text' placeholder='Name*' value={name} onChange={handleName} />
                        <Fancyinput type='email' placeholder='Email*' value={email} onChange={handleEmail} />
                        <Fancyinput type='tel' placeholder='Phone Number' value={phoneNumber} onChange={handlePhoneNumber} />
                        <Fancyinput type='password' placeholder='Password*' value={password} onChange={handlePassword} />
                        <Fancyinput type='password' placeholder='Confirm Password*' value={confirmPassword} onChange={handleConfirmPassword} />
                        <Fancybutton text='Register' onClick={register} disabled={loading} />
                        <Link className='login-link' to='/login'>Already have an account? Login</Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Registration;
