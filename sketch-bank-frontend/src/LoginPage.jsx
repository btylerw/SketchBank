import { useState } from "react";

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUserChange(e) {
        setUsername(e.target.value);
    }

    function handlePassChange(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            <form action=""> 
                Username: <input type="text" onChange={handleUserChange}/>
                Password: <input type="password" onChange={handleUserChange}/>
                <input type="submit" value="Login"/>
            </form>
        </>
    )
}