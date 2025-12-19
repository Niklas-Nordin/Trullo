"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api";
import "./signup.css";

function SignUpPage() {

    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setGeneralError("");

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        try {
            const res = await signUp(username, email, password);

            if (res.message === "User created") {
                router.push("/");
            }

        } catch (error: any) {
            if (error.errors) {
                if (error.errors.username) {
                    setUsernameError(error.errors.username);
                }
                if (error.errors.email) {
                    setEmailError(error.errors.email);
                }
                if (error.errors.password) {
                    setPasswordError(error.errors.password);
                }
            } else {
                setGeneralError(error.message || "An error occurred");
            }
        }
    };

    return (
        <div>
            {generalError && <p className="error-message">{generalError}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    {usernameError && <p className="error-message">{usernameError}</p>}
                    <input type="text" id="username" value={username} onChange={(e) => {
                        setUsername(e.target.value)
                        if(usernameError) setUsernameError("")
                    }} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    {emailError && <p className="error-message">{emailError}</p>}
                    <input type="email" id="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        if(emailError) setEmailError("")
                    }} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    <input type="password" id="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        if(passwordError) setPasswordError("")
                    }} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if(confirmPasswordError) setConfirmPasswordError("")
                    }} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUpPage;