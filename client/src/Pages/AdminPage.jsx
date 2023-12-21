import React from "react";
import Navbar from "../Components/Navbar";
import { NewsContainer } from "../Styles/News.Styled";

const NewsPage = () => {

  return (
    <div>
        <NewsContainer>
            <Navbar/>
            <div style={{color: "white"}}>Hello Admin</div>
        </NewsContainer>
    </div>
  );
};

export default NewsPage;
