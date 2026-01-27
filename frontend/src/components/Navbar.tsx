import Link from "next/link";
import style from "./navbar.module.css"
import LogoutButton from "./LogoutButton";
import Image from "next/image";

type Props = {
  isLoggedIn: boolean;
}

function Navbar({ isLoggedIn }: Props) {

  return (
    <div className={style.navbarContainer}>
      <img className={style.logo} src="./NordinDev-logo.png" alt="NordinDev logo" />
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
          <Link href="/projects">Projects</Link>
          <Link href="/profile" className={style.profileButton}>
            <Image src="/user-profile-icon.svg" alt="Profile" width={24} height={24} />
          </Link>
          <LogoutButton />
        </>
      )}
    </div>
  );
}

export default Navbar;