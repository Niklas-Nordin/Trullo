  import jwt from "jsonwebtoken";
  import { cookies } from "next/headers";
  
  export type AuthStatus =
    | { isLoggedIn: true; user: any }
    | { isLoggedIn: false };

  export async function getAuthStatus(): Promise<AuthStatus> {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return { isLoggedIn: false };
    }

    try {
        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
        );

        return {
        isLoggedIn: true,
        user: decoded,
        };
    } catch {
        return { isLoggedIn: false };
    }
}