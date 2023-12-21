import { useState, useEffect } from "react";
import Loading from "../Loading";

const EmployeeForm = ({ onSave, onCancel, cloth, audienceOptions }) => {

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(cloth?.name ?? "");
    const [brand, setBrand] = useState(cloth?.brand ?? "");
    const [price, setPrice] = useState(cloth?.pric ?? "");
    const [audience, setAudience] = useState(cloth?.audience ?? "");
    const [image, setImage] = useState(cloth?.image ?? "");

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
        <form className="EmployeeForm" onSubmit={onSubmit}>
            <div className="control">
                <label htmlFor="name">Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"/>
            </div>
            <div className="control">
                <label htmlFor="brand">Brand:</label>
                <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    name="brand"
                    id="brand"/>
            </div>
            <div className="control">
                <label htmlFor="price">Price:</label>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="price"
                    id="price"/>
            </div>
            <div className="control">
                <label htmlFor="audience">Audience:</label>
                <select
                    onChange={(e) => setAudience(e.target.value)}
                    name = "audience"
                    id = "audience"
                    value = {audience}>
                    {audienceOptions && audienceOptions.map(option => (
                        <option>{option}</option>
                    ))}
                </select>
            </div>
            <div className="buttons">
                <button type="submit">
                    {cloth ? "Update Cloth" : "Create Cloth"}
                </button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;
