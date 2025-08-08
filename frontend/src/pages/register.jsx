import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register({ onRegister }) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%&*]).{8,}$/;

    // ...imports and useState hooks remain the same

// ✅ REPLACE your current handleSubmit with this one
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 chars, include 1 uppercase & 1 special (!@#$%&*).");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phone,
                    username,
                    email,
                    password
                }),
                credentials: "include" // only if using cookies/sessions
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err || "Registration failed");
            }

            alert("Registered! You can log in now.");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };


    return (
        <div className="register-page">
            <div className="register-frame">
                <h1 className="register-title">Create Your Account</h1>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter last name"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </form>
            </div>
        </div>
    );
}
