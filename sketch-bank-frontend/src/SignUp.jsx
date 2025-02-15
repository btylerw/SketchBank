import { useState, useEffect } from "react"
import { useTheme } from "./ThemeProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from 'axios';
import './styles/SignUp.css';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {theme, siteTheme} = useTheme();
    const style = siteTheme[theme];
    const navigate = useNavigate();
    const auth = useAuth();
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        // Automatically redirects to homepage if user is logged in
        if (auth.loggedIn) {
            navigate('/home');
        }
    }, [auth.loggedIn]);

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    function handleReturn() {
        navigate('/login');
    }

    function checkPass(e) {
        const matchPass = document.getElementById('matchPass');
        matchPass.innerHTML = confirmPassword === password ? '' : 'Passwords do not match';
    }

    async function handleSignup(e) {
        e.preventDefault();
        // Ensure passwords match before proceeding
        if (password === confirmPassword) {
            try {
                // Attempt to create user via back-end endpoint
                await axios.post(`${serverUrl}/users/signup`, {
                    username: username,
                    fname: fname,
                    lname: lname,
                    password: password,
                    email: email
                }).then(response => {
                    // If use creation was good, log the user in
                    const params = {username: username, password: password};
                    auth.loginAttempt(params);
                })
            } catch(error) {
                // If server sends us an error, parse error and display it to user
                // Error will be either username or email already in use
                console.error(error.response.data.error);
                setErrorMessage(error.response.data.error);
            }
        } else {
            console.log('Signup bad');
        }
    }

    return (
        <>
            <div style={{backgroundColor: style.background, color: style.color, padding: '20px', borderRadius: '10px', height: '100vh', width: '100vw'}}>
                <form action="" className="signup-container" onSubmit={handleSignup}>
                    Username: <input style={{backgroundColor: style.inputBackgroundColor, color: style.inputColor, border: 'solid'}} type="text" onChange={(e) => handleChange(e, setUsername)}/>
                    First Name: <input style={{backgroundColor: style.inputBackgroundColor, color: style.inputColor, border: 'solid'}} type="text" onChange={(e) => handleChange(e, setFname)}/>
                    Last Name: <input style={{backgroundColor: style.inputBackgroundColor, color: style.inputColor, border: 'solid'}} type="text" onChange={(e) => handleChange(e, setLname)}/>
                    Password: <input style={{backgroundColor: style.inputBackgroundColor, color: style.inputColor, border: 'solid'}} type="password" onChange={(e) => handleChange(e, setPassword)} onKeyUp={checkPass}/>
                    Confirm Password: <input style={{backgroundColor: style.inputBackgroundColor, color: style.inputColor, border: 'solid'}} type="password" onChange={(e) => handleChange(e, setConfirmPassword)} onKeyUp={checkPass}/>
                    <div id="matchPass" style={{color: 'red'}}></div>
                    Email: <input style={{backgroundColor: style.inputBackgroundColor, color: style.inputColor, border: 'solid'}} type="email" onChange={(e) => handleChange(e, setEmail)}/>
                    <input type="submit" style={{border: 'solid'}} className="signup-btn" value="Submit"/>
                </form>
                <button style={{color: 'white'}} onClick={handleReturn}>Back to Login</button>
                <div style={{color: 'red', fontSize: '20px'}}>{errorMessage}</div>
            </div>
        </>
    )
}