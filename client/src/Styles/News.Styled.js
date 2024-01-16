import styled from "styled-components";

export const NewsPage = styled.div`
    padding-bottom: 50px;
`

export const NewsContainerDiv = styled.div`
    margin: 2.5% 20% 2.5% 20%;
`;

export const NewInnerContainerDiv = styled.div`
    border: 1px solid white;
`

export const NewsTitleDiv = styled.div`
    color: white;
    padding-left: 2.5%;
    border-bottom: 1px solid white;
    max-height: 5%;
    text-align: center;
    color: white;
    font-weight: bold;
    font-variant: small-caps;
    font-size: 25px;
    font-weight: 25px;
    background-color: rgba(237, 26, 68, 0.2);
    @media only screen and (min-width: 350px) and (max-width: 1200px) {
        font-size: 20px;
        font-weight: 20px;
    };
`;

export const NewsMessageDiv = styled.div`
    background-color: #ffbdbf;
    font-size: 20px;
    color: black;
    padding-left: 2.5%;
    min-height: 5vh;
    @media only screen and (min-width: 350px) and (max-width: 1200px) {
        font-size: 15px;
    };
`;

export const NewsDateDiv = styled.div`
    background-color: #ffbdbf;
    color: white;
    padding-left: 80%;
    font-size: 20px;
    color: black;
    font-style: italic;
    @media only screen and (min-width: 350px) and (max-width: 1200px) {
        font-size: 15px;
    };
    @media only screen and (min-width: 500px) and (max-width: 800px) {
        padding-left: 70%;
    };
    @media only screen and (min-width: 350px) and (max-width: 500px) {
        padding-left: 60%;
    };
`;