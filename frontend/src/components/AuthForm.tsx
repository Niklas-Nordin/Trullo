"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, login } from "@/lib/api";
import styles from "./AuthForm.module.css";
import Link from "next/link";

type Props = {
    mode: "login" | "signup";
}

function AuthForm({mode}: Props) {

    const router = useRouter();
    const [identifier, setIdentifier] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [identifierError, setIdentifierError] = useState("");
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
        setIdentifierError("");
        setGeneralError("");

        if (mode === "signup" && password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        try {
            let res;
            if (mode === "signup") {
                res = await signUp(username, email, password);
                if (res.message === "User created") {
                    router.push("/");
                }
            } else {
                res = await login(identifier, password);
                if (res.message === "Login successful") {
                    router.push("/dashboard");
                }
            }


        } catch (error: any) {
            if (error.errors) {
                if (error.errors.username) {
                    setUsernameError(error.errors.username);
                }
                if (error.errors.email) {
                    setEmailError(error.errors.email);
                }
                if (error.errors.identifier) {
                    setIdentifierError(error.errors.identifier);
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
        <div className={styles.authFormContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                {mode === "signup" && (
                    <>
                        <h2 className={styles.h2}>Register</h2>
                        <div className={styles.inputContainer}>
                            {/* <label htmlFor="username">Username:</label> */}
                            {usernameError && <p className={styles.errorMessage}>{usernameError}</p>}
                            <input placeholder="Username:" type="text" id="username" value={username} onChange={(e) => {
                                setUsername(e.target.value)
                                if(usernameError) setUsernameError("")
                            }} className={styles.inputField} />
                        </div>
                        <div className={styles.inputContainer}>
                            {/* <label htmlFor="email">Email:</label> */}
                            {emailError && <p className={styles.errorMessage}>{emailError}</p>}
                            <input placeholder="Email:" type="email" id="email" value={email} onChange={(e) => {
                                setEmail(e.target.value)
                                if(emailError) setEmailError("")
                            }} className={styles.inputField} />
                        </div>
                    </>
                )}
                {mode === "login" && (

                    <div className={styles.inputContainer}>
                        <h2 className={styles.h2}>Sign In</h2>
                        {/* <label htmlFor="identifier">Email or Username:</label> */}
                        {identifierError && <p className={styles.errorMessage}>{identifierError}</p>}
                        <input placeholder="Email or Username:" type="text" id="identifier" value={identifier} onChange={(e) => {
                            setIdentifier(e.target.value)
                            if(identifierError) setIdentifierError("")
                        }} className={styles.inputField} />
                    </div>
                )}
                <div className={styles.inputContainer}>
                    {/* <label htmlFor="password">Password:</label> */}
                    {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                    <input placeholder="Password:" type="password" id="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        if(passwordError) setPasswordError("")
                    }} className={styles.inputField} />
                </div>
                {mode === "signup" && (
                    <div className={styles.inputContainer}>
                        {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
                        {confirmPasswordError && <p className={styles.errorMessage}>{confirmPasswordError}</p>}
                        <input placeholder="Confirm Password:" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            if(confirmPasswordError) setConfirmPasswordError("")
                        }} className={styles.inputField} />
                    </div>
                )}
                {generalError && <p className={`${styles.errorMessage} ${styles.generalError}`}>{generalError}</p>}

                <button type="submit" className={styles.btn}>{mode === "login" ? "Sign In" : "Register"}</button>
                {mode === "login" && (
                    <p className={styles.registerPageLink}>Don't have an account? <Link href="/register"><span>Register</span></Link></p>
                )}
            </form>
        </div>
    );
}

export default AuthForm;