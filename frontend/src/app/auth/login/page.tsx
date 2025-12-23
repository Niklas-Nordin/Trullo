"use client";

import AuthForm from "@/components/AuthForm";
import style from "./login.module.css"

function loginPage() {
  return (
    <div className={style.loginContainer}>
        <AuthForm mode="login" />
    </div>
  );
}

export default loginPage;
