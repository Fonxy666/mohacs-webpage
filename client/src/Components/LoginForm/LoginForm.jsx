import React, { useState } from "react";
import { StyledLoginForm, StyledPassword, StyledInput, StyledShowPasswordButton } from "../../Styles/Login.Styled"

const LoginForm = ({ onSave }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("password");

    const onSubmit = (e) => {
        e.preventDefault();

        return onSave({
            name,
            password
        });
    };

    const handleShowPassword = () => {
        setShowPassword(showPassword === "password" ? "" : "password");
    }

    return (
        <StyledLoginForm onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Username:</label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="brand" className="form-label">Password:</label>
                <StyledPassword>
                    <StyledInput
                        onChange={(e) => setPassword(e.target.value)}
                        name="brand"
                        id="brand"
                        type={showPassword}
                        className="form-control"/>
                    <StyledShowPasswordButton onClick={() => handleShowPassword()} className="btn btn-danger" type="button">Show</StyledShowPasswordButton>
                </StyledPassword>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-danger">Login</button>
            </div>
        </StyledLoginForm>
    );
};

export default LoginForm;
