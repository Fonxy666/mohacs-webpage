import React from "react";
import Cookies from "js-cookie";
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
            if (response.status === 401) {
                alert("Invalid username or password");
            } else {
                alert("Login unsuccessful!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Login failed:", error.message);
    }
};

const NewsPage = () => {
    const handleOnSave = (credentials) => {
        sendLoginRequest(credentials)
        .then((data) => {
            if (data.role) {
                Cookies.set("jwtToken", data.token, { expires: 1});
                Cookies.set("role", data.role, { expires: 1});
                // Cookies.set("jwtToken", data.token, { expires: 0.0001});
                // Cookies.set("role", data.role, { expires: 0.0001});
                console.log(`cookies sat!`)
            } else {
                console.error("Invalid response from server:", data);
            }
        });
    }
    console.log(Cookies.get("jwtToken"));
    console.log(Cookies.get("role"));
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
