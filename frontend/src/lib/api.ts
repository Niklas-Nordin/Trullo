const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

export async function signUp(username: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
    }

    return data;
}