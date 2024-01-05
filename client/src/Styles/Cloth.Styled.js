import styled from "styled-components";
import aceCard from "../Images/ace_card.png";

export const Container = styled.div`
    margin: 5%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5%;
`;

export const ClothCard = styled.div`
    position: relative;
    padding: 5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${aceCard});
        background-size: cover;
        background-position: center;
        opacity: 0.9;
        border-radius: 5px;
    }
`;

export const ClothCardImage = styled.img`
    width: 80%;
    align-self: flex-end;
    border: 1px solid black;
    border-radius: 15px;
    z-index: 1;
`;

export const ClothCardContent = styled.div`
    color: black;
    z-index: 1;
`;

export const ClothCardText = styled.div`
    margin-top: 10px;
`;