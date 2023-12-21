import React from "react";
import Navbar from "../Components/Navbar";
import LoginForm from "../Components/LoginForm";
import { NewsContainer } from "../Styles/News.Styled";

const NewsPage = () => {

  return (
    <div>
        <NewsContainer>
            <Navbar/>
            <LoginForm/>
        </NewsContainer>
    </div>
  );
};

export default NewsPage;
