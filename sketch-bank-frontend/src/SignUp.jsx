import { useState } from "react"
import './styles/SignUp.css';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleChange(e, fn) {
        fn(e.target.value);
    }

    function handleSignup(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            console.log('Signup good');
        } else {
            console.log('Signup bad');
        }
    }

    return (
        <>
            <form action="" className="signup-container" onSubmit={handleSignup}>
                Username: <input type="text" onChange={(e) => handleChange(e, setUsername)}/>
                Password: <input type="password" onChange={(e) => handleChange(e, setPassword)}/>
                Confirm Password: <input type="password" onChange={(e) => handleChange(e, setConfirmPassword)}/>
                Email: <input type="email" onChange={(e) => handleChange(e, setEmail)}/>
                <input type="submit" className="signup-btn" value="Submit"/>
            </form>
        </>
    )
}