import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ClothForm from "../../Components/ClothForm";
import Cookies from "js-cookie";

const modifyExistingCloth = async (cloth, token) => {
    try {
        const response = await fetch(`http://localhost:8080/v1/api/ace-poker/${cloth._id}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(cloth),
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
    const cloth = location.state.cloth;

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}/admin-panel/ace-poker/modification`);
    };

    const handleModification = (cloth) => {
        modifyExistingCloth(cloth, token)
        .then((res) => {
            if (res.success) {
                alert("Módosítás sikeres!");
                navigate(`/${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}/admin-panel/ace-poker/modification`);
            } else {
                console.log(res);
                alert("Valami hiba történt!");
            }
        })
    }

    return (
        <div>
            <ClothForm
                onSave = { (e) => handleModification(e) }
                onCancel = { () => handleCancel() }
                cloth = { cloth }
                audienceOptions={["noi", "ferfi"]}/>
        </div>
    );
};

export default AcePokerChangeDataPage;