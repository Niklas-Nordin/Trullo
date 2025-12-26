"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";
import style from "./logoutButton.module.css";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <button className={style.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;