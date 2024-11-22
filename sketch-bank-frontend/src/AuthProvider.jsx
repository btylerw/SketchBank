import { useContext, createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // stores user data grabbed from database
    const [user, setUser] = useState(null);
    // token will be implemented later
    const [token, setToken] = useState(localStorage.getItem('site') || '');
    // error message used for invalid login attempt
    const [errorMsg, setErrorMsg] = useState('');
    // our login flag, will be replaced by token
    const [loggedIn, setLoggedIn] = useState(false);

    const loginAttempt = async (data) => {
        // Credentials user provided
        const userAttempt = data.username;
        const passAttempt = data.password;
        const params = {username: userAttempt, password: passAttempt}
        try {
            // Attempting to log in with credentials
            await axios.get('http://localhost:3000/users/login', {
                params: params
            }).then(response => {
                if (response.data) {
                    // If login is successful we provide the user with all of their data
                    setUser(response.data);
                    setLoggedIn(true);
                    setErrorMsg('');
                    return;
                } else {
                    setErrorMsg('Invalid Login Info');
                }
            });
        } catch(err) {
            console.error(err);
        }
    }

    // Reset everything and log out
    const logOut = () => {
        setUser(null);
        setLoggedIn(false);
    }
    return <AuthContext.Provider value={{ token, user, loginAttempt, logOut, loggedIn, errorMsg, setErrorMsg }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}