import { useState, useEffect } from "react";
import Loading from "../Loading";
import { StyledForm } from "../../Styles/Form.Styled";

const EmployeeForm = ({ onSave, onCancel, cloth, audienceOptions }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(cloth?.name ?? "");
    const [brand, setBrand] = useState(cloth?.brand ?? "");
    const [price, setPrice] = useState(cloth?.pric ?? "");
    const [audience, setAudience] = useState(cloth?.audience ?? "");
    const [image, setImage] = useState(cloth?.image ?? "");

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

        if (cloth) {
            return onSave({
                ...cloth,
                name,
                brand,
                price,
                audience,
                image
            });
        }

        return onSave({
            name,
            brand,
            price,
            audience,
            image
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <StyledForm className="container" onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">Megjelenítendő név:</label>
                <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="brand">Márka:</label>
                <input
                    className="form-control"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    name="brand"
                    id="brand"/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="price">Ár:</label>
                <input
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                    id="price"/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="audience">Közönség:</label>
                <select
                    className="form-select"
                    onChange={(e) => setAudience(e.target.value)}
                    name = "audience"
                    id = "audience"
                    value = {audience}>
                    {audienceOptions && audienceOptions.map(option => (
                        <option key={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="image"/>
                <input
                    name="image"
                    accept=".jpeg, .png, .jpg"
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) => handleFileUpload(e)}
                    />
            </div>
            <div className="buttons">
                <button className="btn btn-danger" type="submit">
                    {cloth ? "Frissítés" : "Feltöltés"}
                </button>
                <button className="btn btn-danger" type="button" onClick={onCancel} style={{marginLeft: "5px"}}>
                    Cancel
                </button>
            </div>
        </StyledForm>
    );
};

export default EmployeeForm;
