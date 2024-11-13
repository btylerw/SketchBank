import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './styles/LoginPage.css';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    function handleLogin(e) {
        setIsLoggedIn(true);
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
            <a href="">Forgot Password?</a>
        </>
    )
}