import AuthForm from "@/components/auth/AuthForm";
import style from "./register.module.css"

function signUpPage() {
  return (
    <div className={style.registerContainer}>
      <AuthForm mode="signup" />
    </div>
  );
}

export default signUpPage;