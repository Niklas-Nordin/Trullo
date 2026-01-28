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
      <Link className={style.logo} href="/"><img className={style.logo} src="/NordinDev-logo.png" alt="NordinDev logo" /></Link>
      {!isLoggedIn && (
        <>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </>
      )}
      {isLoggedIn && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/projects">Projects</Link>
          <LogoutButton />
        </>
      )}
      <Link href="/auth"><img className={style.profileButton} src="/user-profile-icon.svg" alt="Profile icon" /></Link>
    </div>
  );
}

export default Navbar;