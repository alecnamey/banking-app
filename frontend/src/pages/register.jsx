import React, { useState } from "react";
import "./register.css";
// If you're using React Router and prefer a Link, you can import it:
// import { Link } from "react-router-dom";

export default function Register({ onBack, onSubmit, homePath = "/" }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const update = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleBack = () => {
        if (onBack) return onBack();
        try {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.assign(homePath);
            }
        } catch {
            window.location.assign(homePath);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(form);
        // add your submit logic here
    };

    return (
        <div className="bank-page">
            <div className="bank-frame">
                <button type="button" className="back-btn" onClick={handleBack}>
                    ← back
                </button>

                <h1 className="bank-title">Bank of Alec</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-input"
                            value={form.firstName}
                            onChange={update}
                            autoComplete="given-name"
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-input"
                            value={form.lastName}
                            onChange={update}
                            autoComplete="family-name"
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="username" className="form-label">UserName:</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="form-input"
                            value={form.username}
                            onChange={update}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            value={form.password}
                            onChange={update}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                        <div className="input-with-action">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="form-input"
                                value={form.confirmPassword}
                                onChange={update}
                                autoComplete="new-password"
                            />
                            <button type="submit" className="create-btn">create</button>
                        </div>
                    </div>
                </form>

                {/* If you want a pure Link back (SPA), uncomment and use this inside Router:
        <Link to={homePath} className="back-link">← back</Link>
        */}
            </div>
        </div>
    );
}
// password and username concatinated
