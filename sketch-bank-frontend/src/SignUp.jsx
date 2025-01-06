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
    const {theme, siteTheme} = useTheme();
    const style = siteTheme[theme];
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        // Automatically redirects to homepage if user is logged in
        if (auth.loggedIn) {
            navigate('/home');
        }
    }, [auth.loggedIn]);

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    function checkPass(e) {
        const matchPass = document.getElementById('matchPass');
        matchPass.innerHTML = confirmPassword === password ? '' : 'Passwords do not match';
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            console.log('Signup good');
            await axios.post('http://localhost:3000/users/signup', {
                username: username,
                fname: fname,
                lname: lname,
                password: password,
                email: email
            }).then(response => {
                const params = {username: username, password: password};
                auth.loginAttempt(params);
            })
        } else {
            console.log('Signup bad');
        }
    }

    return (
        <>
            <div style={{backgroundColor: style.background, color: style.color, padding: '20px', borderRadius: '10px'}}>
                <form action="" className="signup-container" onSubmit={handleSignup}>
                    Username: <input type="text" onChange={(e) => handleChange(e, setUsername)}/>
                    First Name: <input type="text" onChange={(e) => handleChange(e, setFname)}/>
                    Last Name: <input type="text" onChange={(e) => handleChange(e, setLname)}/>
                    Password: <input type="password" onChange={(e) => handleChange(e, setPassword)} onKeyUp={checkPass}/>
                    Confirm Password: <input type="password" onChange={(e) => handleChange(e, setConfirmPassword)} onKeyUp={checkPass}/>
                    <div id="matchPass" style={{color: 'red'}}></div>
                    Email: <input type="email" onChange={(e) => handleChange(e, setEmail)}/>
                    <input type="submit" style={{border: 'solid'}} className="signup-btn" value="Submit"/>
                </form>
            </div>
        </>
    )
}