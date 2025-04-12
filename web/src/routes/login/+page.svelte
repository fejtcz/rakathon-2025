<script lang="ts">
    import { apiFetch } from "$lib/api";

    let username = "";
    let password = "";
    let error = "";
    let loading = false;

    async function handleLogin() {
        error = "";
        loading = true;
        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("userName", data.username);
            window.location.href = "/";
        } catch (e: any) {
            error = e.message || "Chyba při přihlášení";
        } finally {
            loading = false;
        }
    }
</script>

<div
    class="min-h-screen flex items-start justify-center pt-24 bg-[#2e2e2e] text-gray-100 px-4"
>
    <form
        on:submit|preventDefault={handleLogin}
        class="bg-[#3a3a3a] rounded-2xl shadow-lg p-10 w-full max-w-md space-y-8 border border-[#4a4a4a]"
    >
        <h2 class="text-2xl font-bold text-[#f6ad55] text-center">
            Přihlášení
        </h2>

        {#if error}
            <div
                class="text-red-400 bg-[#442222] border border-red-500 rounded-xl p-3 text-sm"
            >
                {error}
            </div>
        {/if}

        <div class="flex flex-col space-y-2">
            <label for="email" class="text-sm font-medium text-gray-300"
                >Email</label
            >
            <input
                id="email"
                type="email"
                bind:value={username}
                placeholder="např. jmeno@firma.cz"
                required
                class="w-full px-5 py-3 rounded-lg bg-[#2e2e2e] text-gray-100 placeholder-gray-500 border border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#f6ad55] transition"
            />
        </div>

        <div class="flex flex-col space-y-2">
            <label for="password" class="text-sm font-medium text-gray-300"
                >Heslo</label
            >
            <input
                id="password"
                type="password"
                bind:value={password}
                placeholder="Zadejte heslo"
                required
                class="w-full px-5 py-3 rounded-lg bg-[#2e2e2e] text-gray-100 placeholder-gray-500 border border-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#f6ad55] transition"
            />
        </div>

        <button type="submit" class="btn w-full py-3" disabled={loading}>
            {#if loading}
                ⏳ Přihlašuji...
            {:else}
                🔐 Přihlásit se
            {/if}
        </button>
    </form>
</div>
