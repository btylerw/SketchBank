import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/LoginPage.css';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        const params = {username: username, password: password};
        await axios.get('http://localhost:3000/users/login', {params: params})
        .then(res => {
            if (res.data.isValid) {
                setIsLoggedIn(res.data.isValid);
            } else {
                const errorMsg = document.getElementById('err');
                errorMsg.innerHTML = 'Invalid Login Info';
            }
        });
    }

    if (isLoggedIn) {
        navigate('/home', {state:{username: username}});
    }

    return (
        <>
            <form action="" className="login-container" onSubmit={handleLogin}> 
                Username: <input type="text" onChange={(e)=> {handleChange(e, setUsername)}}/>
                Password: <input type="password" onChange={(e)=> {handleChange(e, setPassword)}}/>
                <input className="login-btn" type="submit" value="Login"/>
            </form>
            <h3 id='err' style={{color: 'red'}}></h3>
            <a href="">Forgot Password?</a>
        </>
    )
}