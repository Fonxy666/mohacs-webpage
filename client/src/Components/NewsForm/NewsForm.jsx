import React, { useState } from "react";
import { StyledForm } from "../../Styles/Form.Styled";

const NewsForm = ({ onSave, onCancel, information }) => {
    const [title, setTitle] = useState(information?.title ?? "");
    const [message, setMessage] = useState(information?.message ?? "");

    const onSubmit = (e) => {
        e.preventDefault();

        if (information) {
            return onSave({
                ...information,
                title,
                message
            });
        }

        return onSave({
            title,
            message
        });
    };

    return (
        <StyledForm className="container" onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="title">Megjelenítendő név:</label>
                <input
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    id="title"/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="message">Hír:</label>
                <input
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    id="message"/>
            </div>
            <div className="buttons">
                <button className="btn btn-danger" type="submit">
                    {information ? "Frissítés" : "Feltöltés"}
                </button>
                <button className="btn btn-danger" type="button" onClick={onCancel} style={{marginLeft: "5px"}}>
                    Cancel
                </button>
            </div>
        </StyledForm>
    );
};

export default NewsForm;
