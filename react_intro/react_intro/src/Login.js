import {Routes, Route } from 'react-router-dom';

function LoginForm() {
    return (
    <>
    <input type="text" placeholder="username"></input>
    <input type="password" placeholder="password"></input>
    </>
    )
}

export default function Login() {
    return (
        <button onClick={LoginForm}>Login</button>
    )
}