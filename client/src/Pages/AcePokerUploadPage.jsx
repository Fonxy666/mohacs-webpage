import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothForm from "../Components/ClothForm"

const sendClothToDatabase = async (cloth) => {
    try {
        const response = await fetch("http://localhost:8080/v1/api/ace-poker/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cloth),
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

const AcePokerUploadPage = () => {
    const navigate = useNavigate();
    const date = new Date();

    const handleSubmit = (element) => {
        sendClothToDatabase(element);
        console.log(element);
    }

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
    }

    return (
        <div>
            <ClothForm
                onSave={(e) => handleSubmit(e)}
                onCancel={() => handleCancel()}
                audienceOptions={["noi", "ferfi"]}/>
        </div>
    );
};

export default AcePokerUploadPage;
