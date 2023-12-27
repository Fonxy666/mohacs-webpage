import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NewsForm from "../Components/NewsForm/NewsForm";

const sendInformationToDatabase = async (information, token) => {
    try {
        console.log(information);
        const response = await fetch("http://localhost:8080/v1/api/news/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(information),
        });
    
        if (!response.ok) {
            if (response.status === 401) {
                alert("You are unathorized!");
            } else {
                alert("New information post to database failed!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Post failed:", error.message);
    }
};

const InformationUploadPage = () => {
    const navigate = useNavigate();
    const date = new Date();

    const handleSubmit = (element) => {
        const token = Cookies.get("jwtToken");
        sendInformationToDatabase(element, token)
        .then(() => {
            navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
            alert("Hír sikeresen feltöltve!");
        });
    }

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
    }

    return (
        <div>
            <NewsForm
                onSave={(e) => handleSubmit(e)}
                onCancel={() => handleCancel()}/>
        </div>
    );
};

export default InformationUploadPage;
