"use client"

import styles from "./auth.module.css"
import AuthForm from "@/components/AuthForm"
import {useState} from "react";

function authPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className={styles.authContainer}>
        <div>
            <button onClick={() => setMode("login")}>Sign In</button>
            <button onClick={() => setMode("signup")}> Register</button>
        </div>
    <AuthForm mode={mode} />
    </div>
  );
}

export default authPage;