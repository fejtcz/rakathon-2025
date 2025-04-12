<script>
	import '../app.css';
   import { onMount } from 'svelte';
   
  let userName = '';

  onMount(() => {
    userName = localStorage.getItem('userName') ?? '';
  });
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>Rakathon 2025 - Kovia</title>
  <meta name="description" content="Rakathon 2025 - Kovia" />
  <link rel="icon" href="/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-[#2e2e2e] text-gray-100">
  <!-- Topbar -->
  <header class="bg-[#3a3a3a] px-6 py-4 shadow-md sticky top-0 z-50 flex justify-between items-center border-b border-[#4a4a4a]">
    <h1 class="text-xl font-semibold tracking-wide text-[#f6ad55]"><a href="/" >Kovia</a></h1>
    {#if userName}
    <div class="flex items-center gap-3">
      <span class="hidden sm:inline text-gray-200">Tlustý Programátor<br />(Case manager)</span>
      <div class="w-10 h-10 rounded-full bg-[#f6ad55] flex items-center justify-center text-[#2e2e2e] font-bold">
        👤
      </div>
      <button
    on:click={logout}
    class="ml-4 px-4 py-2 rounded-lg bg-[#f6ad55] text-[#2e2e2e] font-semibold hover:brightness-110 transition"
  >
    🔓 Odhlásit se
  </button>
    </div>
    {/if}
  </header>

  <!-- Tělo -->
  <main class="p-6">
    <slot />
  </main>
</div>