import React from "react";

const NewsComponent = ({ elements }) => {

    return (
        <div>
            {elements && elements.map(element => (
                <h5>{element}</h5>
            ))}
        </div>
    );
};

export default NewsComponent;
