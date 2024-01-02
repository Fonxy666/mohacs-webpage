import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import NewsForm from "../../Components/NewsForm";

const modifyExistingCloth = async (information, token) => {
    try {
        const response = await fetch(`http://localhost:8080/v1/api/news/${information._id}/update`, {
            method: "PATCH",
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
                alert("Valami hiba történt a törlés során!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return { success: true, response };
    } catch (error) {
        console.error("Patch failed:", error.message);
    }
};

const AcePokerChangeDataPage = () => {
    const token = Cookies.get("jwtToken");
    const navigate = useNavigate();
    const date = new Date();
    const location = useLocation();
    const information = location.state.information;

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}/admin-panel/new/modification`);
    };

    const handleModification = (information) => {
        modifyExistingCloth(information, token)
        .then((res) => {
            if (res.success) {
                alert("Módosítás sikeres!");
                navigate(`/${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}/admin-panel/new/modification`);
            } else {
                console.log(res);
                alert("Valami hiba történt!");
            }
        })
    }

    return (
        <div>
            <NewsForm
                onSave = { (e) => handleModification(e) }
                onCancel = { () => handleCancel() }
                information = { information }/>
        </div>
    );
};

export default AcePokerChangeDataPage;
