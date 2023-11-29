import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

function Login(props) {
    const { loggedIn, setEmail, setLoggedIn } = props

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const chgUsername = (event) => {
        setUsername(event.target.value);
    }

    const chgPassword = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();
    const doLogin = () => {
        const body = JSON.stringify({
            email: username,
            password: password
        });

        console.log(body);
        fetch("/api/login", { // http://localhost:3001
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
                    setEmail(username)
                    setLoggedIn(true)
                    toast.success(data.message);
                    const timer = setTimeout(() => {
                        navigate("/home") 
                    }, 2000);
                } else {
                    toast.error(data.message);
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <div id='form-container'>
                <div id='form'>
                    <h2>Logg inn</h2>
                    <label htmlFor="username">Brukernavn</label>
                    <input type='text' id='username' placeholder='Brukernavn' onChange={chgUsername} />
                    <label htmlFor="password">Passord</label>
                    <input type='password' id='password' placeholder='Passord' onChange={chgPassword} />
                    <button onClick={doLogin}>Logg inn</button>
                    <div>Har du ikke bruker? Registrer <Link to="/register">her</Link></div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Login