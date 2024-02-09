import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElementsTable from "../../Components/ElementsTable";
import Loading from "../../Components/Loading";
import Cookies from "js-cookie";

const getNews = async () => {
    try {
        const response = await fetch("https://localhost:3443/v1/api/news/newest", {
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

const deleteNew = async (id, token) => {
    try {
        const response = await fetch(`https://localhost:3443/v1/api/news/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        });
        if (!response.ok) {
            if (response.status === 401) {
                alert("Nem vagy jogosult törölni!");
            } else {
                alert("Valami hiba történt!");
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
    const [news, setNews] = useState([]);
    const headers = ["#", "Id", "Név", "Szöveg", "Módosítás"];
    const navigate = useNavigate();
    const date = new Date();
    const token = Cookies.get("jwtToken");

    const fetchData = async () => {
        try {
            const clothesData = await getNews();
            setNews(clothesData);
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

    const handleModification = (information) => {
        navigate(`/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/new/modification/${information._id}`, { state: { information } });
    }

    const handleDelete = (id, name) => {
        deleteNew(id, token)
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
                elements = { news }
                headers = { headers }
                onCancel = { handleCancel }
                onModification = { handleModification }
                onDelete = { handleDelete }/>
        </div>
    );
};

export default JumboPokerModifyPage;
