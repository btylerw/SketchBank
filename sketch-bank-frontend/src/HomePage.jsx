import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from 'axios';

export const HomePage = () => {
    const location = useLocation();
    const username = location.state.username;
    const [balance, setBalance] = useState(0);
    const [showForm, setShowForm] = useState(false);

    function changeInputVisibility() {  
        setShowForm(!showForm);
    }

    // Makes numbers easier to read by adding commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async function handleBalanceChange(e) {
        e.preventDefault();
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

    async function retrieveBalance() {
        await axios.get(`http://localhost:3000/users/${username}/info`)
        .then(res => {
            console.log(res.data);
            if (res.data) {
                const newNum = numberWithCommas(res.data);
                setBalance(newNum);
            }
        })
    }

    useEffect(() => {
        retrieveBalance();
    });
    return (
        <>
            <h1>Hello {username}!</h1>
            <h2>You have ${balance}</h2>
            <button onClick={changeInputVisibility}>Change Balance</button>
            {showForm &&
            <form action="" onSubmit={handleBalanceChange}>
                Balance: <input name="newBalance" type="text" />
                <input type="submit" value="Enter" />
            </form>}
        </>
    )
}