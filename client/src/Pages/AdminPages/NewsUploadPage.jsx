import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NewsForm from "../../Components/NewsForm/NewsForm";

const sendInformationToDatabase = async (information, token) => {
    try {
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
                alert("Nem vagy jogosult módositani!");
            } else {
                alert("Valami hiba történt!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return { success: true, response };
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
        .then((response) => {
            if (response.success) {
                navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`);
                alert("Hír sikeresen feltöltve!");
            } else {
                console.log(response);
                alert("Valami hiba történt!");
            }
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
