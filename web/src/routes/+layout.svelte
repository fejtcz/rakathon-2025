<script>
	import '../app.css';
  	const username = "Uživatel";
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>Rakathon 2025 - Kontinuum</title>
  <meta name="description" content="Rakathon 2025 - Kontinuum" />
  <link rel="icon" href="/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-[#2e2e2e] text-gray-100">
  <!-- Topbar -->
  <header class="bg-[#3a3a3a] px-6 py-4 shadow-md sticky top-0 z-50 flex justify-between items-center border-b border-[#4a4a4a]">
    <h1 class="text-xl font-semibold tracking-wide text-[#f6ad55]">Kontinuum</h1>
    <div class="flex items-center gap-3">
      <span class="hidden sm:inline text-gray-200">{username}</span>
      <div class="w-10 h-10 rounded-full bg-[#f6ad55] flex items-center justify-center text-[#2e2e2e] font-bold">
        👤
      </div>
    </div>
  </header>

  <!-- Tělo -->
  <main class="p-6">
    <slot />
  </main>
</div>