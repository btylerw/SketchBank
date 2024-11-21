import { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || '');
    const [balance, setBalance] = useState(null);
    const [acc_id, setAccID] = useState(null);
    const navigate = useNavigate();
    const loginAttempt = async (data) => {
        const userAttempt = data.username;
        const passAttempt = data.password;
        try {
            await axios.get('http://localhost:3000/login', {
                username: userAttempt,
                password: passAttempt
            }).then(response => response.json())
            .then(response => {
                if (response.data) {
                    setUser(data.username);
                    setAccID(data.acc_id);
                    setBalance(data.balance);
                    navigate('/home');
                    return;
                }
            })
        } catch(err) {
            console.error(error);
        }
    }

    const logOut = () => {
        setUser(null);
        setToken('');
        setBalance(null);
        setAccID(null);
        navigate('/login')
    }
    return <AuthContext.Provider value={{ token, user, balance, acc_id, loginAttempt, logOut }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}