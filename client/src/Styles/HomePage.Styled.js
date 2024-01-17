import styled from "styled-components";

export const HomePageContainer = styled.div`
    @media only screen and (min-width: 1200px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    };
`;

export const StyledLogo = styled.img`
    border: 3px solid black;
    border-radius: 15px;
    @media only screen and (min-width: 1200px) {
        grid-area: 1 / 2 / 2 / 3;
        width: 60%;
    };
    @media only screen and (max-width: 1200px) {
        
    }; 
    @media only screen and (min-width: 700px) and (max-width: 1200px) {
        width: 35%;
        margin: 10% 0% 10% 0%;
    };
    @media only screen and (max-width: 700px) {
        width: 50%;
        margin: 10% 0% 10% 0%;
    };
`;

export const LogoText = styled.div`
    color: white;
    font-style: oblique;
    @media only screen and (min-width: 1200px) {
        margin-top: 20%;
        margin-bottom: 10%;
        font-size: 40px;
    };
    @media only screen and (max-width: 1200px) {
        margin: 10% 5% 0% 5%;
        font-size: 30px;
    };   
`;

export const ShopImage = styled.img`
    border: 3px solid white;
    border-radius: 15px;
    @media only screen and (min-width: 1200px) {
        grid-area: 1 / 3 / 2 / 4;
        width: 60%;
        margin: 0% 20% 0% 20%;
    };
    @media only screen and (min-width: 700px) and (max-width: 1200px) {
        width: 30%;
    };
    @media only screen and (max-width: 700px) {
        width: 45%;
    };
`;

export const ShopText = styled.div`
    color: white;
    font-style: oblique;
    @media only screen and (min-width: 1200px) {
        margin: 20vh 20% 5vh 20%;
        font-size: 20px;
    };
    @media only screen and (max-width: 1200px) {
        font-size: 16px;
        margin: 10% 20% 0% 20%;
        padding-bottom: 10%;
    };
`;
