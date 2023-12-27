import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElementsTable from "../../Components/ElementsTable";
import Loading from "../../Components/Loading";
import Cookies from "js-cookie";

const getClothes = async () => {
    try {
        const response = await fetch("http://localhost:8080/v1/api/ace-poker/clothes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Post failed:", error.message);
        throw error;
    }
};

const modifyExistingCloth = async (cloth, token, id) => {
    try {
        const response = await fetch(`http://localhost:8080/v1/api/ace-poker/${id}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(cloth),
        });
    
        if (!response.ok) {
            if (response.status === 401) {
                alert("You are unathorized!");
            } else {
                alert("New cloth post to database failed!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Patch failed:", error.message);
    }
};

const deleteCloth = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/v1/api/ace-poker/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        });
        if (!response.ok) {
            if (response.status === 401) {
                alert("You are unathorized!");
            } else {
                alert("Cloth delete failed!");
                console.error(`HTTP error! Status: ${response.status}`);
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Delete failed:", error.message);
    }
}

const AcePokerModifyPage = () => {
    const [loading, setLoading] = useState(true);
    const [clothes, setClothes] = useState([]);
    const headers = ["#", "Id", "Név", "Márka", "Ár", "Közönség", "Kép", "Regisztrálási időpont"];
    const navigate = useNavigate();
    const date = new Date();
    const token = Cookies.get("jwtToken");

    const fetchData = async () => {
        try {
            const clothesData = await getClothes();
            setClothes(clothesData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancel = () => {
        navigate(`/${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}/admin-panel`);
    };

    const handleModification = (id, name) => {
        console.log(id);
        console.log(name);
        alert(`${name} sikeresen frissítve!`);
    }
    
    const handleDelete = (id, name) => {
        deleteCloth(id, token)
        .then(() => alert(`${name} sikeresen törölve!`));
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <ElementsTable 
                elements = { clothes }
                headers = { headers }
                onCancel = { handleCancel }
                onModification = { handleModification }
                onDelete = { handleDelete }/>
        </div>
    );
};

export default AcePokerModifyPage;
