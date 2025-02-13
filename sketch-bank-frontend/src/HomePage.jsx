import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useTheme } from "./ThemeProvider";
import { Transactions } from "./Transactions";
import axios from 'axios';

export const HomePage = () => {
    const [showBalanceForm, setShowBalanceForm] = useState(false);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const {user, logOut, loggedIn, setBalance} = useAuth();
    const {theme, siteTheme} = useTheme();
    const style = siteTheme[theme];
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate();

    function handleLogOut(e) {
        e.preventDefault();
        navigate('/login');
        logOut();
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
        await axios.post(`${serverUrl}/users/changeBalance/`, {
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
    
    // Some functions to toggle form visibility.
    function changeInputVisibility() {  
        setShowBalanceForm(!showBalanceForm);
    }

    function transactionFormVisibility() {
        setShowTransactionForm(!showTransactionForm);
    }

    // Temporary function for transaction submit
    // Will be replaced by one that saves transaction data to database
    async function showValues(e) {
        e.preventDefault();
        await axios.post(`${serverUrl}/users/addTransaction`, {
            acc_id: user.acc_id,
            transName: e.target.name.value,
            transPrice: Number(e.target.price.value),
            transCat: e.target.cat.value,
            transDate: e.target.date.value,
            balance: user.balance
        })
        .then(response => {
            console.log(response);
        })
    }
    return (
        <>
        <div style={{backgroundColor: style.background, color: style.color, height: '100vh', width: '100vw'}}>
            <h1>Hello {user.username}!</h1>
            <h2>You have ${numberWithCommas(user.balance)}</h2>
            <button onClick={changeInputVisibility}>Change Balance</button>
            {showBalanceForm &&
            <form action="" onSubmit={handleBalanceChange}>
                Balance: <input name="newBalance" type="text" />
                <input type="submit" value="Enter" />
            </form>}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Transactions />
                <button onClick={transactionFormVisibility}>Add Transaction</button>
                {showTransactionForm &&
                    <form onSubmit={showValues}>
                        Transaction Name: <input name="name" type="text" />
                        Price: <input name="price" type="number" step=".01"/>
                        Category: <input name="cat" type="text" />
                        Date: <input name="date" type="date" />
                        <input type="submit" value="Enter" />                
                    </form>
                }
            </div>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
        </>
    )
}