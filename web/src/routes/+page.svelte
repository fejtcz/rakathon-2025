<script>
import { apiFetch } from '$lib/api';
import { redirect } from '@sveltejs/kit';
</script>

<div class="min-h-screen bg-[#2e2e2e] text-gray-100">
    <main class="p-6 space-y-6">
        <section
            class="bg-[#3b3b3b] rounded-2xl shadow-md p-6 border border-[#4a4a4a]"
        >
            <h2 class="text-lg font-semibold text-[#f6ad55] mb-2">Úvod</h2>
            <p class="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                at elit euismod, varius quam ac, tincidunt arcu.
            </p>
        </section>

        <section
            class="bg-[#3b3b3b] rounded-2xl shadow-md p-6 border border-[#4a4a4a]"
        >
            <h2 class="text-lg font-semibold text-[#f6ad55] mb-2">
                Nadcházející schůzky
            </h2>
            <p class="text-gray-300">
                Nulla facilisi. Proin sed nisi vel metus dignissim tincidunt in
                sit amet urna.
            </p>
        </section>

        <section
            class="bg-[#3b3b3b] rounded-2xl shadow-md p-6 border border-[#4a4a4a]"
        >
            <h2 class="text-lg font-semibold text-[#f6ad55] mb-2">
                Statistiky
            </h2>
            <p class="text-gray-300">
                Curabitur nec magna eget elit dapibus gravida. Integer vel
                imperdiet leo.
            </p>
        </section>
    </main>
</div>
