<script lang="ts">
    type Pacient = {
        jmeno: string;
        rc: string;
        diagnoza: string;
        stav: "projednano" | "cekajici";
    };

    let pacienti: Pacient[] = [
        {
            jmeno: "Jan Novák",
            rc: "881224/0123",
            diagnoza: "C34 - Karcinom plic",
            stav: "projednano",
        },
        {
            jmeno: "Eva Dvořáková",
            rc: "790315/4567",
            diagnoza: "C50 - Karcinom prsu",
            stav: "cekajici",
        },
        {
            jmeno: "Tomáš Černý",
            rc: "900101/7890",
            diagnoza: "C18 - Kolorektální karcinom",
            stav: "projednano",
        },
        {
            jmeno: "Lucie Malá",
            rc: "851115/2345",
            diagnoza: "C64 - Karcinom ledviny",
            stav: "cekajici",
        },
    ];
</script>

<div class="max-w-5xl mx-auto px-4 py-6 text-white">
    <h2 class="text-2xl font-bold text-[#f6ad55] mb-6">
        Seznam pacientů k projednání
    </h2>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
        {#each pacienti as pacient}
            <div
                class="rounded-xl p-4 shadow transition border border-[#444]"
                class:bg-green-700={pacient.stav === "projednano"}
                class:bg-red-600={pacient.stav === "cekajici"}
            >
                <div class="text-lg font-semibold">{pacient.jmeno}</div>
                <div class="text-sm text-gray-300">
                    Rodné číslo: {pacient.rc}
                </div>
                <div class="text-sm">
                    Diagnóza: <span class="font-medium">{pacient.diagnoza}</span
                    >
                </div>
                <div class="text-xs mt-2 italic">
                    {pacient.stav === "projednano"
                        ? "✅ Projednáno"
                        : "⏳ Čeká na projednání"}
                </div>
            </div>
        {/each}
    </div>
</div>
