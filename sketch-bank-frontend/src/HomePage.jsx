import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export const HomePage = () => {
    const location = useLocation();
    const username = location.state.username;
    const [balance, setBalance] = useState(0);
    const [showForm, setShowForm] = useState(false);

    function changeInputVisibility() {  
        setShowForm(!showForm);
    }

    function handleBalanceChange(e) {
        setBalance(Number(e.target.newBalance.value));
        changeInputVisibility();
    }

    async function retrieveBalance() {
        //console.log('into here');
        await axios.get(`http://localhost:3000/users/${username}/info`)
        .then(res => {
            if (res.data.balance) {
                setBalance(res.data.balance);
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