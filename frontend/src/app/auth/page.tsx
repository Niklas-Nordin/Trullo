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
          <span className={styles.slider} data-mode={mode} />
          <button className={`${styles.toggleButton}`} onClick={() => setMode("login")}>Sign In</button>
          <button className={`${styles.toggleButton}`} onClick={() => setMode("signup")}>Register</button>
        </div>
        <div className={styles.formWrapper}>
          <AuthForm mode={mode} />
        </div>
      </div>
      <Concave />
    </div>
  );
}

export default authPage;