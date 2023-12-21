import React, { useState } from "react";
import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";
import NewsComponent from "../Components/News";
import Footer from "../Components/Footer";
import { NewsContainer } from "../Styles/News.Styled";

const NewsPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
        {loading ? (
            <Loading/>
        ) : (
            <NewsContainer>
                <Navbar/>
                <NewsComponent 
                    elements = {["haha", "hehe", "hahi"]}/>
                <Footer/>
            </NewsContainer>
        )}
    </div>
  );
};

export default NewsPage;
