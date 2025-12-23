import {redirect} from "next/navigation";
import { getAuthStatus } from "@/lib/auth";

async function layout({children}: {children: React.ReactNode}) {

    const auth = await getAuthStatus();

    if (!auth.isLoggedIn) {
    redirect("/auth/login");
    }
    
  return (
    <div>
      {children}
    </div>
  );
}

export default layout;