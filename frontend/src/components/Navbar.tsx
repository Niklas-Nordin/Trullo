"use client"

import Link from "next/link";
import style from "./navbar.module.css"
import LogoutButton from "./auth/LogoutButton";
import { useEffect, useState } from "react";
import { div } from "framer-motion/client";

type Props = {
  isLoggedIn: boolean;
}

function Navbar({ isLoggedIn }: Props) {

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={style.navbarContainer}>
      <Link className={style.logo} href="/"><img className={style.logo} src="/FlowLine.png" alt="FlowLine logo" /></Link>
      <div className={`${style.navLinks} ${menuOpen ? style.open : ""}`}>
        <img className={style.close} src="./close.svg" alt="Close X mark" onClick={() => setMenuOpen(false)} />
        {!isLoggedIn && (
          <>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/" onClick={() => setMenuOpen(false)}>Contact</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
            <LogoutButton />
          </>
        )}
      </div>
      <Link href="/auth"><img className={style.profileButton} src="/user-profile-icon.svg" alt="Profile icon" /></Link>
      <button className={style.hamburgerMenu} onClick={() => setMenuOpen(prev => !prev)}>
        <img src="./hamburger-menu.svg" alt="Hamburger menu for navigation links" />
      </button>

      { menuOpen && <div className={style.overlay} onClick={() => setMenuOpen(false)}/>
      }
    </div>
  );
}

export default Navbar;