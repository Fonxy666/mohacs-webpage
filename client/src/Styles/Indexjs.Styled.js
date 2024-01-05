import styled from 'styled-components';
import backgroundImage from "../Images/cards.png";

export const RouterDiv = styled.div`
    min-height: 100vh;
    background: radial-gradient(circle, rgba(122,12,12,0.5) 0%, rgba(79,19,19,0.7) 50%, rgba(0,0,0,1) 100%);
    background-size: cover;
    background-position: center;
    position: relative;
    
    &:before {
        content: '';
        background-image: url(${backgroundImage});
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.5;
        z-index: -1;
    }
`;
