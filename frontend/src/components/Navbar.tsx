"use client";

import Link from "next/link";
import style from "./navbar.module.css"

function Navbar() {
  return (
    <div className={style.navbarContainer}>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/login">Sign In</Link>
    </div>
  );
}

export default Navbar;