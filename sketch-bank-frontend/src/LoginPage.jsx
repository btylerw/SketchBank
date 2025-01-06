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
    const {theme, handleThemeChange, siteTheme} = useTheme();
    const style = siteTheme[theme];

    useEffect(() => {
        // Automatically redirects to homepage if user is logged in
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
            <div style={{backgroundColor: style.background, color: style.color, padding: '20px', borderRadius: '10px'}}>
                <div className="text-5xl font-bold underline">
                    Welcome to Sketch Bank!
                </div>
                <form action="" className="login-container" onSubmit={handleLogin}> 
                    Username: <input type="text" onChange={(e)=> {handleChange(e, setInputUser)}}/>
                    Password: <input type="password" onChange={(e)=> {handleChange(e, setInputPass)}}/>
                    <input className="login-btn" style={{border: 'solid'}} type="submit" value="Login"/>
                    <div style={{color: 'red'}}>{auth.errorMsg}</div>
                </form>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h3 id='err' style={{color: 'red'}}></h3>
                    <a href="">Forgot Password?</a>
                    <Link to="/signup">Create Account</Link>
                    <button onClick={handleThemeChange} style={{width: '50%'}}>Click to Change Theme</button>
                </div>
            </div>
        </>
    )
}