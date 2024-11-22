import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from 'axios';

export const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const {user, logOut, loggedIn} = useAuth();

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
        const newBalance = Number(e.target.newBalance.value);
        await axios.post('http://localhost:3000/users/changeBalance/', {
            username,
            newBalance,
        })
        .then(response => {
            if (response) {
                const newNum = numberWithCommas(newBalance);
                setBalance(newNum);
            }
        })
        changeInputVisibility();
    }

    return (
        <>
            <h1>Hello {user.username}!</h1>
            <h2>You have ${user.balance}</h2>
            <button onClick={changeInputVisibility}>Change Balance</button>
            {showForm &&
            <form action="" onSubmit={handleBalanceChange}>
                Balance: <input name="newBalance" type="text" />
                <input type="submit" value="Enter" />
            </form>}
            <button onClick={handleLogOut}>Log Out</button>
        </>
    )
}