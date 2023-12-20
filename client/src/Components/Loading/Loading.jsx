import React from "react";
import { LoadingDivContainer, LoadingDiv } from "../../Styles/Loading.Styled";

const Loading = () => {

  return (
    <LoadingDivContainer>
        <LoadingDiv className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
        </LoadingDiv>
    </LoadingDivContainer>
  );
};

export default Loading;
