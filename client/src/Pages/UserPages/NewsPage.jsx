import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import Navbar from "../../Components/Navbar";
import NewsComponent from "../../Components/News";
import Footer from "../../Components/Footer";

const getNews = async () => {
    try {
        const response = await fetch("http://localhost:8080/v1/api/news/newest", {
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

const NewsPage = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

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

  return (
    <div>
        {loading ? (
            <Loading/>
        ) : (
            <div>
                <Navbar/>
                <NewsComponent 
                    elements = {news}/>
                <Footer/>
            </div>
        )}
    </div>
  );
};

export default NewsPage;
