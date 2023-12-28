import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElementsTable from "../../Components/ElementsTable";
import Loading from "../../Components/Loading";
import Cookies from "js-cookie";

const getClothes = async () => {
    try {
        const response = await fetch("http://localhost:8080/v1/api/jumbo-poker/clothes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error("Post failed:", error.message);
        throw error;
    }
};

const deleteCloth = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/v1/api/jumbo-poker/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
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
        console.error("Delete failed:", error.message);
    }
}

const JumboPokerModifyPage = () => {
    const [loading, setLoading] = useState(true);
    const [clothes, setClothes] = useState([]);
    const headers = ["#", "Id", "Név", "Márka", "Ár", "Közönség", "Kép", "Regisztrálási időpont"];
    const navigate = useNavigate();
    const date = new Date();
    const token = Cookies.get("jwtToken");

    const fetchData = async () => {
        try {
            const clothesData = await getClothes();
            setClothes(clothesData.data);
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
        .then((response) => {
            if (response.success) {
                alert(`${name} sikeresen törölve!`);
            }
        })
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

export default JumboPokerModifyPage;
