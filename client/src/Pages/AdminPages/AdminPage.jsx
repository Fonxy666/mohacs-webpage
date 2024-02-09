import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../Components/Navbar";
import LoginForm from "../../Components/LoginForm";
import { StyledDiv } from "../../Styles/AdminPage.Styled";

const sendLoginRequest = async (user) => {
    try {
        const response = await fetch("https://localhost:3443/v1/api/users/login", {
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
            <Navbar/>
            {jwtToken && role === "Admin" ? (
                <div>
                    <StyledDiv className="dropdown">
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
                    </StyledDiv>
                    <StyledDiv className="dropdown">
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
                    </StyledDiv>
                    <StyledDiv className="dropdown">
                        <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Feltöltés mind a kettő boltba
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to={"./both/upload"} className="dropdown-item">Feltöltés</Link>
                            </li>
                        </ul>
                    </StyledDiv>
                    <StyledDiv className="dropdown">
                        <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Hírek kezelése
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to={"./new/upload"} className="dropdown-item">Feltöltés</Link>
                            </li>
                            <li>
                                <Link to={"./new/modification"} className="dropdown-item">Módosítás / Törlés</Link>
                            </li>
                        </ul>
                    </StyledDiv>
                </div>
            ) : (
                <LoginForm
                    onSave = { (element) => handleOnSave(element) }/>
                ) 
            }
        </div>
    );
};

export default AdminPage;
