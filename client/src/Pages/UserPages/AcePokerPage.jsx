import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import Navbar from "../../Components/Navbar";
import ClothUserComponent from "../../Components/ClothUserComponent/ClothUserComponent";
import Footer from "../../Components/Footer";

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
        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error("Post failed:", error.message);
        throw error;
    }
};

const AcePokerPage = () => {
  const [loading, setLoading] = useState(true);
  const [clothes, setClothes] = useState([]);

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

  return (
    <div>
        {loading ? (
            <Loading/>
        ) : (
            <div>
                <Navbar/>
                <ClothUserComponent 
                    elements = {clothes.data}
                    audiences = {["ferfi", "noi"]}
                    url = { "ace-poker" }/>
            </div>
        )}
    </div>
  );
};

export default AcePokerPage;
