import { browser } from '$app/environment';
import { goto } from '$app/navigation';

const API_BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T = any>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = browser ? localStorage.getItem('access_token') : null;

    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        },
        ...options
    });

    if (response.status === 401 && browser) {
        localStorage.clear();
        goto('/login');
        throw new Error('Neautorizovaný přístup');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Chyba ${response.status}`);
    }

    return response.json();
}