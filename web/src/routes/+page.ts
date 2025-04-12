import { apiFetch } from '$lib/api';
import { redirect } from '@sveltejs/kit';

export async function load() {
    if (typeof window === 'undefined') {
        // Pokud běží na serveru, přesměrujte na login (nebo jiná logika)
        throw redirect(302, '/login');
    }

    const userID = localStorage.getItem("userId"); // Pouze na klientovi

    if (!userID) {
        throw redirect(302, '/login'); // Pokud není userID, přesměrujte
    }

    try {
        await apiFetch(`/users/${userID}`); // Ověří token, nebo vyhodí 401
        return {};
    } catch {
        throw redirect(302, '/login');
    }
}