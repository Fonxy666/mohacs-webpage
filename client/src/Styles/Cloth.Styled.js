import styled, { keyframes } from "styled-components";
import aceCard from "../Images/ace_card.jpg";
import jackCard from "../Images/jack_card.jpg";

const dealAnimation = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const getCardImage = () => {
    const url = window.location.href.split("/")[3];
    if (url && url === "ace-poker") {
        return aceCard;
    } else if (url && url === "jumbo-poker") {
        return jackCard;
    }
    return aceCard;
};

export const ClothCard = styled.div`
    animation: ${dealAnimation} 0.5s ease-out;
    animation-fill-mode: backwards;
    background: url(${() => getCardImage()});
    background-repeat: no-repeat;
    min-height: 340px;
    background-size: 100% 100%;
    width: 90%;
    border-radius: 10px;
    border: 2px solid black;
`;

export const ClothCardImage = styled.img`
    margin-top: 25px;
    min-height: 200px;
    align-self: center;
    border: 1px solid black;
    border-radius: 15px;
    z-index: 1;
    opacity: unset;
`;

export const StyledDiv = styled.div`
    margin: 0 auto;
    width: 70%;
    height: 250px;
    display: flex;
    flex-direction: column;
    opacity: 1;
`;

export const Container = styled.div`
    position: relative;
    height: 100vh;
`;

export const CenteredButton = styled.button`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
`;

export const ClothCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    max-width: 300px;
`