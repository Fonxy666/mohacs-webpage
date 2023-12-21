import React from "react";
import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";
import { NewsContainer } from "../Styles/News.Styled";

const sendLoginRequest = async (user) => {
    try {
        const response = await fetch("http://localhost:8080/v1/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            alert("Invalid credentials!");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Login successful!");
    } catch (error) {
        console.error("Login failed:", error.message);
    }
};

const NewsPage = () => {

    const handleOnSave = (credentials) => {
        const login = sendLoginRequest(credentials);
    }

    return (
        <div>
            <NewsContainer>
                <Navbar/>
                <LoginForm
                    onSave = { (element) => handleOnSave(element) }/>
            </NewsContainer>
        </div>
    );
};

export default NewsPage;
