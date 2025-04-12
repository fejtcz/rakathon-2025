import { redirect } from '@sveltejs/kit';
import { apiFetch } from '$lib/api';

export async function requireAuth(): Promise<string> {
    const id = localStorage.getItem('userId');
    if (!id) throw redirect(302, '/login');

    try {
        await apiFetch(`/users/${id}`);
        return id;
    } catch {
        throw redirect(302, '/login');
    }
}

export function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
}