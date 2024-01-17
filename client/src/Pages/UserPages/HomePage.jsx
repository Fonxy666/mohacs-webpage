import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import AcePokerShopImage from "../../Images/ace_poker_shop.jpg";
import JumboPokerShopImage from "../../Images/jumbo_poker_shop.jpg";
import Logo from "../../Images/logo2.png";
import { HomePageContainer, StyledLogo, LogoText, ShopImage, ShopText } from "../../Styles/HomePage.Styled";

const HomePage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    return (
        <div>
            {windowWidth > 1200 ? (
                <div>
                    <Navbar/>
                    <HomePageContainer>
                        <div className="text-center">
                            <ShopText>
                                Üdvözöljük az Ász Póker butikban, ahol exkluzív és stílusos ruhákat kínálunk férfiaknak és nőknek.
                                Minőségi anyagokból készült kollekciónkban garantáltan megtalálhatja az egyedi stílusokat.
                                Fedezze fel az Ász Póker divatvilágát, ahol kifinomultság és kényelem találkozik!
                            </ShopText>
                            <ShopImage src={AcePokerShopImage}/>
                        </div>
                        <div className="text-center">
                            <LogoText>
                                Üdvözlünk Mohács Ász & Jumbó Póker ruhabolt oldalán!
                            </LogoText>
                            <StyledLogo src={Logo} alt="image"/>
                        </div>
                        <div className="text-center">
                            <ShopText>
                                Üdvözöljük az Jumbó Póker butikban, ahol exkluzív és stílusos ruhákat kínálunk nőknek és gyermekeknek.
                                Minőségi anyagokból készült kollekciónkban garantáltan megtalálhatja az egyedi stílusokat.
                                Fedezze fel az Jumbó Póker divatvilágát, ahol kifinomultság és kényelem találkozik!
                            </ShopText>
                            <ShopImage src={JumboPokerShopImage}/>
                        </div>
                    </HomePageContainer>
                </div>
            ) : (
                <div>
                    <Navbar/>
                    <HomePageContainer>
                        <div className="text-center">
                            <LogoText>
                                Üdvözlünk Mohács Ász & Jumbó Póker ruhabolt oldalán!
                            </LogoText>
                            <StyledLogo src={Logo} alt="image"/>
                        </div>
                        <div className="text-center">
                            <ShopImage src={AcePokerShopImage}/>
                            <ShopText>
                                Üdvözöljük az Ász Póker butikban, ahol exkluzív és stílusos ruhákat kínálunk férfiaknak és nőknek.
                                Minőségi anyagokból készült kollekciónkban garantáltan megtalálhatja az egyedi stílusokat.
                                Fedezze fel az Ász Póker divatvilágát, ahol kifinomultság és kényelem találkozik!
                            </ShopText>
                        </div>
                        <div className="text-center">
                            <ShopImage src={JumboPokerShopImage}/>
                            <ShopText>
                                Üdvözöljük az Jumbó Póker butikban, ahol exkluzív és stílusos ruhákat kínálunk nőknek és gyermekeknek.
                                Minőségi anyagokból készült kollekciónkban garantáltan megtalálhatja az egyedi stílusokat.
                                Fedezze fel az Jumbó Póker divatvilágát, ahol kifinomultság és kényelem találkozik!
                            </ShopText>
                        </div>
                    </HomePageContainer>
                </div>
            )}
        </div>
    );
};

export default HomePage;