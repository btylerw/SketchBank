import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";
import axios from 'axios';
import './styles/LoginPage.css';

export const LoginPage = () => {
    const [inputUser, setInputUser] = useState('');
    const [inputPass, setInputPass] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();
    const {theme, setTheme, handleThemeChange} = useTheme();

    useEffect(() => {
        if (auth.loggedIn) {
            navigate('/home');
        }
    }, [auth.loggedIn]);

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        auth.setErrorMsg('');
        const params = {username: inputUser, password: inputPass};
        auth.loginAttempt(params);
        return;
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
                <div style={{color: 'red'}}>{auth.errorMsg}</div>
                <h3 id='err' style={{color: 'red'}}></h3>
                <a href="">Forgot Password?</a>
                <Link to="/signup">Create Account</Link>
                <button onClick={handleThemeChange}>Click to Change Theme</button>
            </div>
        </>
    )
}