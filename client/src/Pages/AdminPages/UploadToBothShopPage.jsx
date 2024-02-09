import React from "react";
import { useNavigate } from "react-router-dom";
import ClothForm from "../../Components/ClothForm"
import Cookies from "js-cookie";

const sendClothToJumboPokerDatabase = async (cloth, token) => {
    try {
        const response = await fetch("https://localhost:3443/v1/api/ace-poker/upload", {
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

const sendClothToAcePokerDatabase = async (cloth, token) => {
    try {
        const response = await fetch("https://localhost:3443/v1/api/jumbo-poker/upload", {
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

const UploadToBothShopPage = () => {
    const navigate = useNavigate();
    const date = new Date();

    const handleSubmit = (element) => {
        const token = Cookies.get("jwtToken");
        sendClothToJumboPokerDatabase(element, token)
        .then((data) => {
            alert("Ruha sikeresen feltöltve az első boltba!");
        });
        sendClothToAcePokerDatabase(element, token)
        .then(() => {
            alert("Ruha sikeresen feltöltve mind a kettő boltba!");
            navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
        })
    }

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
    }

    return (
        <div>
            <ClothForm
                onSave = { (e) => handleSubmit(e) }
                onCancel = { () => handleCancel() }
                audienceOptions={["Női"]}/>
        </div>
    );
};

export default UploadToBothShopPage;
