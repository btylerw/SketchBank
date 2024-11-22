import { useContext, createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || '');
    const [errorMsg, setErrorMsg] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const loginAttempt = async (data) => {
        const userAttempt = data.username;
        const passAttempt = data.password;
        const params = {username: userAttempt, password: passAttempt}
        //setErrorMsg('Invalid Login Info');
        console.log('test');
        try {
            await axios.get('http://localhost:3000/users/login', {
                params: params
            }).then(response => {
                if (response.data) {
                    console.log(response.data);
                    setUser(response.data);
                    setLoggedIn(true);
                    //setErrorMsg('');
                    return;
                } else {
                }
            });
        } catch(err) {
            console.error(err);
        }
    }

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