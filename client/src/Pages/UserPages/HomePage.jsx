import React from "react";
import Navbar from "../../Components/Navbar";
import AcePokerShopImage from "../../Images/ace_poker_shop.jpg";
import JumboPokerShopImage from "../../Images/jumbo_poker_shop.jpg";
import Logo from "../../Images/logo2.png";
import { ImageContainer, ShopImage, LogoContainer, StyledLogo, CurvedTextContainer } from "../../Styles/HomePage.Styled";
import ReactCurvedText from 'react-curved-text';

const HomePage = () => {

  return (
    <div>
        <Navbar/>
        <div>
            <div style={{ margin: "auto", width: "50%" }}>
                <LogoContainer>
                    <StyledLogo src={Logo} alt="image"/>
                </LogoContainer>
                <CurvedTextContainer>
                    <ReactCurvedText
                        width={500}
                        height={500}
                        cx={200}
                        cy={200}
                        rx={200}
                        ry={200}
                        startOffset={0}
                        reversed={false}
                        text=" Üdvözlünk Mohács Ász & Jumbó Póker ruhabolt oldalán!"
                        textProps={{ style: { fontSize: 25, fill: "white" } }}/>
                </CurvedTextContainer>
            </div>
                <ImageContainer>
                    <ShopImage src={AcePokerShopImage} alt="image"/>
                </ImageContainer>
                <ImageContainer>
                    <ShopImage src={JumboPokerShopImage} alt="image"/>
                </ImageContainer>
        </div>
    </div>
  );
};

export default HomePage;