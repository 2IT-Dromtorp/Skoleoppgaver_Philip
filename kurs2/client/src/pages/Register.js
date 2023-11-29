import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

function Register(props) {
    const { loggedIn, email, setEmail, setLoggedIn } = props

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const doRegister = () => {

        if (username.length < 4 || username.length > 24) {
            setMessage('Brukernavn må være mellom 4 og 24 karakterer langt.');
            return;
        }

        if (!/^[a-zA-Z0-9æøåÆØÅ]+$/.test(username)) {
            setMessage('Brukernavn kan bare bestå av tall og nummer.');
            return;
        }

        if (password.length < 4 || password.length > 24 || !/^[a-zA-Z1-9æøåÆØÅ~`!@#\$%\^&*\(\)_\-\+={[}\]|\\:;"'<,>.?\/]+$/.test(password)) {
            setMessage('Password must be between 4 and 24 characters and can only include letters, numbers, and special characters: ~`!@#\$%\^&*()_-+={[}]|\\:;"\'<,>.?/');
            return;
        }

        const body = JSON.stringify({
            email: username,
            password: password
        });

        console.log(body);
        fetch("/api/adduser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === "S") {
                    toast.success(data.message)
                } else {
                    setMessage(data.message);
                }
            })
            .catch(error => console.error(error));
    }

    const chgUsername = (event) => {
        setUsername(event.target.value);
    }

    const chgPassord = (event) => {
        setPassword(event.target.value);
    }

    return (
        <>
            <div id='form-container'>
                <div id='form'>
                    <label htmlFor="username">Brukernavn</label>
                    <input type='text' id='username' placeholder='Brukernavn' onChange={chgUsername} />
                    <label htmlFor="password">Passord</label>
                    <input type='password' id='password' placeholder='Passord' onChange={chgPassord} />
                    <button onClick={doRegister}>Registrer</button>
                    <p>{message}</p>
                    Tilbake til <Link to="/login">login</Link>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Register