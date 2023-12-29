import React, { useState } from "react";
import Loading from "../../Components/Loading";
import Navbar from "../../Components/Navbar";
import NewsComponent from "../../Components/News";
import Footer from "../../Components/Footer";

const NewsPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
        {loading ? (
            <Loading/>
        ) : (
            <div>
                <Navbar/>
                <NewsComponent 
                    elements = {["haha", "hehe", "hahi"]}/>
                <Footer/>
            </div>
        )}
    </div>
  );
};

export default NewsPage;
