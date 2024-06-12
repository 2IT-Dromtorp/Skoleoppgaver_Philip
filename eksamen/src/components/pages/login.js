import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fancyinput from '../fancyinput/fancyinput';
import Fancybutton from '../fancybutton/fancybutton';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const login = () => {
    setLoading(true);
    const body = { email, password };

    fetch('http://localhost:8080/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          console.log(data);
          localStorage.setItem('token', data.token);
          navigate(`/profile/${data.user._id}`);
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  return (
    <div className='page-wrapper'>
      <main className='main-container'>
        <section className='content-wrapper'>
          <div className='title-wrapper'>
            <h1 className='title'>Welcome back</h1>
          </div>
          <div className='login-container'>
            <Fancyinput type='email' placeholder='Email*' value={email} onChange={handleEmail} />
            <Fancyinput type='password' placeholder='Password*' value={password} onChange={handlePassword} />
            <Fancybutton text='Login' onClick={login} disabled={loading} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
