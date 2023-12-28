import styled from "styled-components";

export const StyledImageWrapper = styled.div`
    width: 5vh;
    height: 5vh;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    border: 3px;
    border-color: black;

    &:active {
        transform: scale(12);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: rgba(0, 0, 0, 1);
        width: 50vh;
        height: 50vh;
    }
`;

export const StyledImageForTable = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

export const StyledImageForModal = styled.img`
    width: 60%;
    object-fit: contain;
`;