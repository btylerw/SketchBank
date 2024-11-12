import { useState } from "react";
import './styles/LoginPage.css';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
        const user = document.getElementById('user');
        const pass = document.getElementById('pass');
        user.innerHTML = username;
        pass.innerHTML = password;
    }

    return (
        <>
            <h1 id="user"></h1>
            <h1 id="pass"></h1>
            <form action="" className="login-container" onSubmit={handleLogin}> 
                Username: <input type="text" onChange={(e)=> {handleChange(e, setUsername)}}/>
                Password: <input type="password" onChange={(e)=> {handleChange(e, setPassword)}}/>
                <input className="login-btn" type="submit" value="Login"/>
            </form>
            <a href="">Forgot Password?</a>
        </>
    )
}