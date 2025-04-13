<script lang="ts">
    type Udalost = {
        title: string;
        date: string;
    };

    let aktualniMesic: Date = new Date();
    let udalosti: Udalost[] = [
        { title: "MDT – Jan Novák", date: "2025-04-01" },
        { title: "MDT – Lenka Dusilova", date: "2025-04-01" },
        { title: "CT – František Vopršálek", date: "2025-04-05" },
        { title: "PET/CT – Eva Dvořáková", date: "2025-04-06" },
        { title: "MR – Josef Černý", date: "2025-04-04" },
    ];

    function getCalendarDays(year: number, month: number) {
        const days = [];
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Pondělí jako 0
        const totalDays = startDay + lastDayOfMonth.getDate();
        const totalCells = Math.ceil(totalDays / 7) * 7;

        const startDate = new Date(year, month, 1 - startDay);

        for (let i = 0; i < totalCells; i++) {
            const current = new Date(startDate);
            current.setDate(startDate.getDate() + i);
            days.push(current);
        }

        return days;
    }

    $: rok = aktualniMesic.getFullYear();
    $: mesic = aktualniMesic.getMonth();
    $: dny = getCalendarDays(rok, mesic);

    function formatDatum(d: Date) {
        return d.toISOString().split("T")[0];
    }

    function predchoziMesic() {
        aktualniMesic = new Date(rok, mesic - 1, 1);
    }

    function dalsiMesic() {
        aktualniMesic = new Date(rok, mesic + 1, 1);
    }

    const nazevDne = [
        "Pondělí",
        "Úterý",
        "Středa",
        "Čtvrtek",
        "Pátek",
        "Sobota",
        "Neděle",
    ];
</script>

<div class="max-w-7xl mx-auto px-4 py-6 text-white">
    <div class="flex justify-between items-center mb-6">
        <button
            on:click={predchoziMesic}
            class="px-3 py-1 bg-[#3a3a3a] rounded hover:bg-[#4a4a4a]">◀</button
        >
        <h2 class="text-2xl font-bold text-[#f6ad55]">
            {aktualniMesic.toLocaleString("cs-CZ", {
                month: "long",
                year: "numeric",
            })}
        </h2>
        <button
            on:click={dalsiMesic}
            class="px-3 py-1 bg-[#3a3a3a] rounded hover:bg-[#4a4a4a]">▶</button
        >
    </div>

    <div
        class="grid grid-cols-7 gap-px bg-[#444] rounded overflow-hidden text-sm"
    >
        {#each dny as den}
            <div
                class="bg-[#2e2e2e] border border-[#3a3a3a] h-28 flex flex-col p-2 hover:bg-[#3a3a3a] transition relative"
            >
                <div class="text-xs font-semibold text-white mb-1">
                    {nazevDne[den.getDay() === 0 ? 6 : den.getDay() - 1]}
                    {den.getDate()}.
                </div>

                {#each udalosti.filter((u) => u.date === formatDatum(den)) as udalost}
                    <div
                        class="text-xs bg-[#f6ad55] text-black rounded px-1 py-0.5 mb-1 truncate"
                    >
                        {udalost.title}
                    </div>
                {/each}

                {#if den.getMonth() !== mesic}
                    <div
                        class="absolute inset-0 bg-[#2e2e2e] opacity-50 pointer-events-none"
                    ></div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
