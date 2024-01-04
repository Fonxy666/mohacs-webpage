import React from "react";
import { NewsContainerDiv, NewsDateDiv, NewsTitleDiv, NewsMessageDiv, NewInnerContainerDiv, NewsPage } from "../../Styles/News.Styled";

const NewsComponent = ({ elements }) => {

    const splitDate = (date) => {
        return date.split("T")[0];
    }

    return (
        <NewsPage>
            {elements && elements.map(element => (
                <NewsContainerDiv key={element._id}>
                    <NewInnerContainerDiv>
                        <NewsTitleDiv>{element.title}</NewsTitleDiv>
                        <NewsMessageDiv>{element.message}</NewsMessageDiv>
                        <NewsDateDiv>{splitDate(element.date)}</NewsDateDiv>
                    </NewInnerContainerDiv>
                </NewsContainerDiv>
            ))}
        </NewsPage>
    );
};

export default NewsComponent;
