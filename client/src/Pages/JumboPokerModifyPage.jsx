import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElementsTable from "../Components/ElementsTable";
import Loading from "../Components/Loading";

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

        return await response.json();
    } catch (error) {
        console.error("Post failed:", error.message);
        throw error;
    }
};

const JumboPokerModifyPage = () => {
    const [loading, setLoading] = useState(true);
    const [clothes, setClothes] = useState([]);
    const headers = ["#", "Id", "Név", "Márka", "Ár", "Közönség", "Kép", "Módosítás"];
    const navigate = useNavigate();
    const date = new Date();

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <ElementsTable 
                elements = { clothes }
                headers = { headers }
                onCancel = { handleCancel }/>
        </div>
    );
};

export default JumboPokerModifyPage;
