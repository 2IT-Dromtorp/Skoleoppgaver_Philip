import React from 'react';

function Login() {
  const doLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
      alert('Logget inn ass')
    } else if (username === '' || password === '') {
      alert('Vennligst fyll ut brukernavn og passord')
    } else {
      alert('Feil brukernavn eller passord')
    }
  };

  return (
    <div id='loginbox'>
      <form>
        <input id='username' placeholder='Brukernavn' />
        <input id='password' placeholder='Passord' type='password' />
        <input type='button' onClick={doLogin} value='Logg Inn' />
      </form>
    </div>
  );
}

export default Login;