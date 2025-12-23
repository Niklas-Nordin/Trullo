import Link from "next/link";
import style from "./navbar.module.css"

type Props = {
  isLoggedIn: boolean;
}

async function Navbar({ isLoggedIn }: Props) {

  return (
    <div className={style.navbarContainer}>
      {!isLoggedIn && (
        <>
          <Link href="/">Home</Link>
          <Link href="/auth/register">Register</Link>
          <Link href="/auth/login">Sign In</Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link href="/dashboard">Dashboard</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;