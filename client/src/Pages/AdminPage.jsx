import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const AdminPage = () => {
    const [jwtToken, setJwtToken] = useState(Cookies.get("jwtToken"));
    const [role, setRole] = useState(Cookies.get("role"));

    const handleOnSave = (credentials) => {
        sendLoginRequest(credentials)
        .then((data) => {
            if (data.role) {
                Cookies.set("jwtToken", data.token, { expires: 1 / 24});
                setJwtToken(data.token);
                Cookies.set("role", data.role, { expires: 1 / 24});
                setRole(data.role);
            } else {
                console.error("Invalid response from server:", data);
            }
        });
    }

    return (
        <div>
            <NewsContainer>
                <Navbar/>
                {jwtToken && role === "Admin" ? (
                    <div>
                        <div className="dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ász póker ruhák kezelése
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={"./ace-poker/upload"} className="dropdown-item">Feltöltés</Link>
                                </li>
                                <li>
                                    <Link to={"./ace-poker/modification"} className="dropdown-item">Módosítás / Törlés</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Jumbó póker ruhák kezelése
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={"./jumbo-poker/upload"} className="dropdown-item">Feltöltés</Link>
                                </li>
                                <li>
                                    <Link to={"./jumbo-poker/modification"} className="dropdown-item">Módosítás / Törlés</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Hírek kezelése
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={"./information/upload"} className="dropdown-item">Feltöltés</Link>
                                </li>
                                <li>
                                    <Link to={"./information/modification"} className="dropdown-item">Módosítás / Törlés</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <LoginForm
                        onSave = { (element) => handleOnSave(element) }/>
                    ) 
                }
            </NewsContainer>
        </div>
    );
};

export default AdminPage;
