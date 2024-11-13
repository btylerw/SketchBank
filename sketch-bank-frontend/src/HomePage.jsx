import { useState } from "react";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
    const location = useLocation();
    const username = location.state.username;
    return (
        <>
        <h1>Hello {username}!</h1>
        </>
    )
}