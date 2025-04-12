<script lang="ts">
    export let status: number = 404; // Výchozí hodnota pro 404
    export let error: Error & { status?: number } = {
        message: "Funkce nebyla nalezena!",
        status: 404,
    };
</script>

<div
    class="min-h-screen flex flex-col items-center bg-[#2e2e2e] text-gray-100 px-6"
>
    <h1 class="text-6xl font-bold text-[#f6ad55] mb-4">{status}</h1>
    <p class="text-xl mb-6">{error?.message || "Došlo k chybě!"}</p>

    {#if status === 404}
        <p class="text-gray-400 mb-4">
            Tuto funkci jsme nenašli. Zkontrolujte prosím URL adresu nebo se
            vraťte na dashboard.
        </p>
        <a
            href="/"
            class="mt-4 px-6 py-3 bg-[#f6ad55] text-[#2e2e2e] rounded-xl font-semibold hover:brightness-110 transition"
        >
            Zpět na Dashboard
        </a>
    {:else}
        <p class="text-gray-400">Něco se pokazilo…</p>
    {/if}
</div>
