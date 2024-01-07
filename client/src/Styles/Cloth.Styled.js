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
    background-image: url(${() => getCardImage()});
    background-size: cover; 

`;

export const ClothCardImage = styled.img`
    width: 70%;
    min-height: 300px;
    height: 100%;
    align-self: center;
    border: 1px solid black;
    border-radius: 15px;
    z-index: 1;
`;
