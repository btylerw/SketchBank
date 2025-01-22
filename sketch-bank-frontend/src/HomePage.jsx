import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";
import axios from 'axios';

export const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const {user, logOut, loggedIn, setBalance} = useAuth();
    const {theme, siteTheme} = useTheme();
    const style = siteTheme[theme];

    const navigate = useNavigate();

    function handleLogOut(e) {
        e.preventDefault();
        navigate('/login');
        logOut();
    }

    function changeInputVisibility() {  
        setShowForm(!showForm);
    }

    // Makes numbers easier to read by adding commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async function handleBalanceChange(e) {
        e.preventDefault();
        const username = user.username;
        const acc_id = user.acc_id;
        const newBalance = Number(e.target.newBalance.value);
        await axios.post('http://localhost:3000/users/changeBalance/', {
            acc_id,
            newBalance,
        })
        .then(response => {
            if (response) {
                const newNum = numberWithCommas(newBalance);
                setBalance(newBalance);
            }
        })
        changeInputVisibility();
    }

    return (
        <>
        <div style={{backgroundColor: style.background, color: style.color, height: '100vh', width: '100vw'}}>
            <h1>Hello {user.username}!</h1>
            <h2>You have ${numberWithCommas(user.balance)}</h2>
            <button onClick={changeInputVisibility}>Change Balance</button>
            {showForm &&
            <form action="" onSubmit={handleBalanceChange}>
                Balance: <input name="newBalance" type="text" />
                <input type="submit" value="Enter" />
            </form>}
            <button onClick={handleLogOut}>Log Out</button>
        </div>
        </>
    )
}