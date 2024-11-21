import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";
import axios from 'axios';
import './styles/LoginPage.css';

export const LoginPage = () => {
    const [inputUser, setInputUser] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const {theme, setTheme} = useTheme();

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        const params = {username: inputUser, password: inputPass};
        auth.loginAttempt(params);
        return;
    }

    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <>
            <div style={{backgroundColor: theme === 'dark' ? 'black' : 'white'}}>
                <div className="splash-msg">
                    Welcome to Sketch Bank!
                </div>
                <form action="" className="login-container" onSubmit={handleLogin}> 
                    Username: <input type="text" onChange={(e)=> {handleChange(e, setInputUser)}}/>
                    Password: <input type="password" onChange={(e)=> {handleChange(e, setInputPass)}}/>
                    <input className="login-btn" type="submit" value="Login"/>
                </form>
                <h3 id='err' style={{color: 'red'}}></h3>
                <a href="">Forgot Password?</a>
                <Link to="/signup">Create Account</Link>
                <button onClick={handleThemeChange}>Click to Change Theme</button>
            </div>
        </>
    )
}