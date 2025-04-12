import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    // Pokud žádná stránka nebyla nalezena, nastavíme status 404
    if (response.status === 404) {
        return new Response(response.body, {
            ...response,
            status: 404,
        });
    }

    return response;
};