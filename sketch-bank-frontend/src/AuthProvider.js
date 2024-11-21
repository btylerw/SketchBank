import { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('site') || '');
    const navigate = useNavigate();
    const loginAttempt = async (data) => {
        const {username, password} = data;
        // We will implement login logic here
        // Update login endpoint to send user information back to the frontend
    }
    return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}