const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(identifier: string, password: string) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password }),
    });
    
    const data = await res.json();

    if(!res.ok) {
        throw data
    }

    return data;
}

export async function signUp(username: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    
    const data = await res.json();

    if(!res.ok) {
        throw data
    }

    return data;
}

export async function logout() {
    const res = await fetch(`${API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    const data = await res.json();

    if(!res.ok) {
        throw data
    }

    return data;
}