import styled from "styled-components";

export const StyledLoginForm = styled.form`
    position: absolute;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f0f0f0;
    border-radius: 15px;
    padding: 30px;
`;

export const StyledPassword = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`

export const StyledInput = styled.input`
    grid-area: 1 / 1 / 2 / 4;
`

export const StyledShowPasswordButton = styled.button`
    margin-left: 5px;
    grid-area: 1 / 4 / 2 / 5;
`
