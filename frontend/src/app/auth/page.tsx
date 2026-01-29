"use client"

import styles from "./auth.module.css"
import AuthForm from "@/components/auth/AuthForm"
import {useState} from "react";
import Concave from "@/components/cssPattern/Concave";

function authPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className={styles.authContainer}>
      <div className={styles.centerContent}>
        <div className={styles.toggleContainer}>
          <button onClick={() => setMode("login")}>Sign In</button>
          <button onClick={() => setMode("signup")}> Register</button>
        </div>
        <AuthForm mode={mode} />
      </div>
      <Concave />
    </div>
  );
}

export default authPage;