import { useState, useEffect } from "react";
import { StyledForm } from "../../Styles/Form.Styled";

const EmployeeForm = ({ onSave, onCancel, cloth, audienceOptions }) => {
    const [name, setName] = useState(cloth?.name ?? "");
    const [brand, setBrand] = useState(cloth?.brand ?? "");
    const [price, setPrice] = useState(cloth?.price ?? "");
    const [audience, setAudience] = useState(cloth?.audience ?? "");
    const [image, setImage] = useState(cloth?.image ?? "");
    const [isFormValid, setIsFormValid] = useState(false);
    const [priceError, setPriceError] = useState("");
    const [nameError, setNameError] = useState("");

    useEffect(() => {
        if (audienceOptions.length <= 1) {
            setAudience(audienceOptions[0]);
        }
    }, []);

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

    useEffect(() => {
        const isValid = name.trim() !== "" && name.length <= 16 && brand.trim() !== "" && /^\d+$/.test(price.toString().trim()) && audience !== "" && image !== "";
        setIsFormValid(isValid);

        if (!/^\d+$/.test(price.toString().trim()) && price.length > 0) {
            setPriceError("Ár mező csak számot tartalmazhat");
        } else if (name.length > 16) {
            setNameError("El fog csúszni!")
        } else {
            setPriceError("");
            setNameError("");
        }
    }, [name, brand, price, audience, image]);

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
                {nameError && (
                    <div className="alert alert-danger" role="alert">
                        {nameError}
                    </div>
                )}
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
                {priceError && (
                    <div className="alert alert-danger" role="alert">
                        {priceError}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="audience">Közönség:</label>
                {audienceOptions && audienceOptions.length > 1 ? (
                    <select
                        className="form-select"
                        onChange={(e) => setAudience(e.target.value)}
                        name = "audience"
                        id = "audience"
                        value = {audience}>
                        {audience === "" && <option>Válassz egyet!</option>}
                        {audienceOptions.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <fieldset disabled>
                        <input
                            type="text"
                            id="disabledTextInput"
                            className="form-control"
                            defaultValue={audience}/>
                    </fieldset>
                )}
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
                    {cloth ? "Frissítés" : "Feltöltés"}
                </button>
                <button className="btn btn-danger" type="button" onClick={onCancel} style={{marginLeft: "5px"}}>
                    Vissza
                </button>
            </div>
        </StyledForm>
    );
};

export default EmployeeForm;
