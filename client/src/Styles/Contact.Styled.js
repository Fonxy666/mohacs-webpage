import styled from "styled-components";

export const ContactDivContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    min-height: 94vh;
    @media only screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
    };
`;

export const MapContainer = styled.iframe`
    border-radius: 15px;
    width: 100%;
    height: 85%;
    @media only screen and (min-width: 450px) and (max-width: 1000px) {
        height: 70%;
    };
    @media only screen and (max-width: 450px) {
        height: 60%;
    };
`;

export const CardContainer = styled.div`
    position: relative;
    width: 70%;
    max-width: 600px;
    margin: 5vw auto 7vw auto;
    background-color: rgba(237, 26, 68, 0.2);
    border-radius: 15px;
    color: white;
    overflow: auto;
`

export const DescriptionContainer = styled.div`
    height: 15%;
    @media only screen and (min-width: 450px) and (max-width: 1000px) {
        height: 30%;
    };
    @media only screen and (max-width: 450px) {
        height: 40%;
    };
`

export const StyledText = styled.div`
    font-weight: 700;
    height: 30%;
`
