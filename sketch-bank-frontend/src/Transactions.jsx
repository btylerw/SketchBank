import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";

export const Transactions = () => {
    const {user} = useAuth();
    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(false);
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const showTransactions = transactions?.map((transaction, key) => {
        return (
            <div key={key}>
                <h4>{transaction.item}</h4>
                <h4>{transaction.price}</h4>
                <p>{transaction.category}</p>
                <p>{transaction.date}</p>
            </div>
        )
    })

    useEffect(() => {
        async function getTrans() {
            const params = {acc_id: user.acc_id};
            try {
                await axios.get(`${serverUrl}/users/getTransactions`, {
                    params: params,
                })
                .then(response => {
                    if (response.data) {
                        console.log(response.data);
                        setTransactions(response.data);
                        console.log(transactions);
                        setLoading(true);
                    }
                })
            } catch(error) {
                console.error(error);
            }
        }
        getTrans();
    }, []);
    
    return (
        <>
            {loading && showTransactions}
        </>
    )
}