import React, { useState, useEffect } from "react";
import { StyledForm } from "../../Styles/Form.Styled";

const NewsForm = ({ onSave, onCancel, information }) => {
    const [title, setTitle] = useState(information?.title ?? "");
    const [message, setMessage] = useState(information?.message ?? "");
    const [image, setImage] = useState(information?.image ?? "");
    const [isFormValid, setIsFormValid] = useState(false);

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertImageToBase64(file);
        setImage(base64);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        
        if (information) {
            return onSave({
                ...information,
                title,
                message,
                image
            });
        }
        
        return onSave({
            title,
            message,
            image
        });
    };

    useEffect(() => {
        const isValid = title.trim() !== "" && message.trim() !== "";
        setIsFormValid(isValid);
    }, [title, message]);

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
            <div className="mb-3">
                <label className="form-label" htmlFor="image">Kép:</label>
                <input
                    name="image"
                    accept=".jpeg, .png, .jpg"
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) => handleFileUpload(e)}
                    />
                {image && (
                    <div className="mt-2">
                    <img src={image} alt="Preview" style={{ maxWidth: "30%" }} />
                    </div>
                )}
            </div>
            <div className="buttons">
                <button className={`btn btn-danger ${isFormValid ? "" : "disabled"}`} type="submit">
                    {information ? "Frissítés" : "Feltöltés"}
                </button>
                <button className="btn btn-danger" type="button" onClick={onCancel} style={{marginLeft: "5px"}}>
                    Vissza
                </button>
            </div>
        </StyledForm>
    );
};

export default NewsForm;
