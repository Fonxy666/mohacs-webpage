import React from "react";
import { useNavigate } from "react-router-dom";
import ClothForm from "../../Components/ClothForm"
import Cookies from "js-cookie";

const sendClothToDatabase = async (cloth, token) => {
    try {
        const response = await fetch("http://localhost:8080/v1/api/jumbo-poker/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(cloth),
        });
    
        if (!response.ok) {
            if (response.status === 401) {
                alert("Nem vagy jogosult feltölteni!!");
            } else {
                alert("Valami hiva történt!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Post failed:", error.message);
    }
};

const JumboPokerUploadPage = () => {
    const navigate = useNavigate();
    const date = new Date();

    const handleSubmit = (element) => {
        const token = Cookies.get("jwtToken");
        sendClothToDatabase(element, token)
        .then(() => {
            navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
            alert("Ruha sikeresen feltöltve!");
        });
    }

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
    }

    return (
        <div>
            <ClothForm
                onSave={(e) => handleSubmit(e)}
                onCancel={() => handleCancel()}
                audienceOptions={["Női", "Gyerek"]}/>
        </div>
    );
};

export default JumboPokerUploadPage;
