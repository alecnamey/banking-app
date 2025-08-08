import React from "react";
import "./bank-login.css";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function BankLogin({ onSubmit, onRegister }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <div className="bank-page">
            <div className="bank-frame">
                <h1 className="bank-title">Bank of Alec</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input id="username" type="text" className="form-input"/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <div className="input-with-action">
                            <input id="password" type="password" className="form-input"/>
                            <button type="submit" className="enter-btn">enter</button>
                        </div>
                    </div>
                </form>

                <div className="register-row">
                    <span className="no-account">No account?</span>
                    <Link to="/register" className="register-link">Register</Link>
                </div>
                <div className="disclaimer">
                    <span className="disclaimer-text">Disclaimer! This is not a real banking app, this is just
                    for a project to show off some of my coding skills.</span>
                </div>
            </div>
        </div>
    );
}
