<script lang="ts">
    export let users = [
        {
            id: "1",
            name: "MUDr. Jan Novák",
            clinic: "Klinika onkologie",
            avatar: "https://i.pravatar.cc/100?img=1",
            response: "accepted",
            presence: null,
        },
        {
            id: "2",
            name: "MUDr. Anna Malá",
            clinic: "Klinika pediatrie",
            avatar: "https://i.pravatar.cc/100?img=2",
            response: "accepted",
            presence: null,
        },
        {
            id: "3",
            name: "MUDr. Tomáš Hladký",
            clinic: "Klinika ortopedie",
            avatar: "https://i.pravatar.cc/100?img=3",
            response: "no-response",
            presence: null,
        },
        {
            id: "4",
            name: "MUDr. Petra Černá",
            clinic: "Klinika chirurgie",
            avatar: "https://i.pravatar.cc/100?img=4",
            response: "accepted",
            presence: null,
        },
        {
            id: "5",
            name: "MUDr. Jakub Šedý",
            clinic: "Klinika onkologie",
            avatar: "https://i.pravatar.cc/100?img=5",
            response: "declined",
            presence: null,
        },
    ];

    function setPresence(id, state) {
        users = users.map((u) => (u.id === id ? { ...u, presence: state } : u));
    }

    function getResponseColor(response) {
        switch (response) {
            case "accepted":
                return "bg-green-500 text-white";
            case "declined":
                return "bg-red-500 text-white";
            case "no-response":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-600 text-white";
        }
    }

    function getResponseText(response) {
        switch (response) {
            case "accepted":
                return "Potvrdil";
            case "declined":
                return "Zamítl";
            case "no-response":
                return "Neodpověděl";
            default:
                return "—";
        }
    }

    function addNote() {
        if (extraNotes.length < 10) {
            extraNotes.push("");
        }
    }

    function removeNote(index: number) {
        extraNotes.splice(index, 1);
    }

    function handleSubmit() {
        const members = selectedMembers.map((user) => ({
            ...user,
            note: "",
        }));

        const payload = {
            meetingDateTime,
            boardType,
            location,
            reminderHours,
            members,
            extraNotes,
        };
    }

    type Vysetreni = {
        metoda: string;
        datum: string;
        misto: string;
        vysledek: string;
    };

    let vysetreniAVykony: Vysetreni[] = [];

    function pridejVysetreni() {
        vysetreniAVykony = [
            ...vysetreniAVykony,
            { metoda: "", datum: "", misto: "", vysledek: "" },
        ];
    }

    type Otazka = {
        komu: string;
        text: string;
    };

    let otazky: Otazka[] = [];

    const lekari = [
        "MUDr. Novák",
        "MUDr. Svobodová",
        "MUDr. Dvořák",
        "MUDr. Křížová",
        "MUDr. Marek",
    ];

    function pridejOtazku() {
        otazky = [...otazky, { komu: "", text: "" }];
    }

    type Ukol = {
        komu: string;
        popis: string;
        termin: string;
    };

    let ukolList: Ukol[] = [];

    function pridejUkol() {
        ukolList = [...ukolList, { komu: "", popis: "", termin: "" }];
    }

    type Soubor = {
        nazev: string;
        typ: string; // např. 'pdf', 'jpg'
        datum: string;
    };

    let soubory: Soubor[] = [
        { nazev: "CT_plice.pdf", typ: "pdf", datum: "2025-04-12" },
        { nazev: "PET_sken.jpg", typ: "jpg", datum: "2025-04-11" },
        { nazev: "Histologie.pdf", typ: "pdf", datum: "2025-04-10" },
        { nazev: "MR_mozek.jpg", typ: "jpg", datum: "2025-04-09" },
    ];

    function ikonaProTyp(typ: string) {
        switch (typ) {
            case "pdf":
                return "📄";
            case "jpg":
            case "jpeg":
            case "png":
                return "🖼️";
            case "doc":
            case "docx":
                return "📝";
            default:
                return "📁";
        }
    }

    import { onMount, onDestroy } from "svelte";

    let loading = true;
    let paused = false;
    let seconds = 0;
    let interval: number;

    onMount(() => {
        interval = setInterval(() => {
            if (loading && !paused) {
                seconds += 1;
                if (seconds >= 300) {
                    loading = false;
                    clearInterval(interval);
                }
            }
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    function formatTime(sec: number) {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }

    function pauznout() {
        paused = !paused;
    }

    function zastavit() {
        loading = false;
        clearInterval(interval);
    }
</script>

<div class="space-y-6 text-white bg-[#2e2e2e] p-6 rounded-xl max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-[#f6ad55]">
            Pacient – František Vopršálek (881224/0123)
        </h2>

        {#if loading}
            <div class="flex items-center gap-4 text-sm text-white">
                <div class="flex items-center gap-2 animate-pulse">
                    <svg
                        class="w-5 h-5 animate-spin text-[#f6ad55]"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <span>Nahrávání... {formatTime(seconds)}</span>
                </div>

                <!-- Ovládací tlačítka -->
                <div class="flex gap-2">
                    <button
                        on:click={pauznout}
                        class="text-xs px-2 py-1 rounded bg-[#4a4a4a] hover:bg-[#5a5a5a] border border-[#666]"
                    >
                        {paused ? "▶️ Pokračovat" : "⏸️ Pauza"}
                    </button>
                    <button
                        on:click={zastavit}
                        class="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                    >
                        ⏹️ Zastavit
                    </button>
                </div>
            </div>
        {/if}
    </div>
    <div class="bg-[#3a3a3a] rounded-2xl shadow-md p-6 border border-[#4a4a4a]">
        <h2 class="text-xl font-semibold text-[#f6ad55] mb-4">
            Přítomní účastníci
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each users as user (user.id)}
                <div
                    class="flex items-center justify-between bg-[#2e2e2e] p-3 rounded-xl"
                >
                    <!-- Avatar + jméno -->
                    <div class="flex items-center gap-4">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            class="w-12 h-12 rounded-full border border-[#4a4a4a]"
                        />
                        <div>
                            <div class="text-gray-100 font-medium">
                                {user.name}
                            </div>
                            <div class="text-gray-400 text-sm">
                                {user.clinic}
                            </div>
                        </div>
                    </div>

                    <!-- Status odpovědi -->
                    <div
                        class={`px-3 py-1 text-sm rounded-full font-semibold ${getResponseColor(user.response)}`}
                    >
                        {getResponseText(user.response)}
                    </div>

                    <!-- Přepínače přítomnosti -->
                    <div class="ml-4 flex gap-2">
                        <button
                            class={`px-3 py-1 rounded-full text-lg font-semibold transition border-2 ${
                                user.presence === true
                                    ? "bg-green-500 text-white border-green-400"
                                    : "bg-transparent text-green-400 border-green-500 hover:bg-green-500 hover:text-white"
                            }`}
                            on:click={() => setPresence(user.id, true)}
                        >
                            ✅
                        </button>

                        <button
                            class={`px-3 py-1 rounded-full text-lg font-semibold transition border-2 ${
                                user.presence === false
                                    ? "bg-red-500 text-white border-red-400"
                                    : "bg-transparent text-red-400 border-red-500 hover:bg-red-500 hover:text-white"
                            }`}
                            on:click={() => setPresence(user.id, false)}
                        >
                            ❌
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div>
        <h3 class="text-xl font-semibold">Epikríza pacienta</h3>
        <textarea
            rows="4"
            class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
        ></textarea>
    </div>
    <div>
        <h3 class="text-xl font-semibold">Poznámka</h3>
        <textarea
            rows="4"
            class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
        ></textarea>
    </div>

    <div class="space-y-4">
        <h3 class="text-xl font-semibold">Relevantní vyšetření a výkony</h3>

        {#each vysetreniAVykony as vysetreni, i}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                    type="text"
                    placeholder="Zobrazovací metoda"
                    bind:value={vysetreni.metoda}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                />
                <input
                    type="date"
                    bind:value={vysetreni.datum}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                />
                <input
                    type="text"
                    placeholder="Místo provedení"
                    bind:value={vysetreni.misto}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                />
                <input
                    type="text"
                    placeholder="Výsledek vyšetření"
                    bind:value={vysetreni.vysledek}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                />
            </div>
        {/each}

        <button
            type="button"
            on:click={pridejVysetreni}
            class="bg-[#f6ad55] text-black px-4 py-2 rounded hover:bg-opacity-90 transition"
        >
            + Přidat vyšetření
        </button>
    </div>

    <div class="space-y-4">
        <h3 class="text-xl font-semibold">Otázky na MDT</h3>

        {#each otazky as otazka, i}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                    bind:value={otazka.komu}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                >
                    <option disabled selected value="">Vyber lékaře</option>
                    {#each lekari as lekar}
                        <option>{lekar}</option>
                    {/each}
                </select>

                <textarea
                    bind:value={otazka.text}
                    placeholder="Text otázky"
                    class="w-full md:col-span-2 px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                    rows="2"
                ></textarea>
            </div>
        {/each}

        <button
            type="button"
            on:click={pridejOtazku}
            class="bg-[#f6ad55] text-black px-4 py-2 rounded hover:bg-opacity-90 transition"
        >
            + Přidat otázku
        </button>
    </div>

    <div class="space-y-4">
        <h3 class="text-xl font-semibold">Úkoly další péče</h3>

        {#each ukolList as ukol, i}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                    bind:value={ukol.komu}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                >
                    <option disabled selected value="">Vyber lékaře</option>
                    {#each lekari as lekar}
                        <option>{lekar}</option>
                    {/each}
                </select>

                <input
                    type="text"
                    placeholder="Popis úkolu"
                    bind:value={ukol.popis}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                />

                <input
                    type="date"
                    bind:value={ukol.termin}
                    class="w-full px-3 py-2 rounded border border-[#555] bg-[#3a3a3a] text-white"
                />
            </div>
        {/each}

        <button
            type="button"
            on:click={pridejUkol}
            class="bg-[#f6ad55] text-black px-4 py-2 rounded hover:bg-opacity-90 transition"
        >
            + Přidat úkol
        </button>

        <div class="space-y-2">
            <h3 class="text-xl font-semibold">Připojené soubory</h3>

            <div
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
                {#each soubory as soubor}
                    <div
                        class="bg-[#3a3a3a] rounded-lg p-4 flex flex-col items-center text-center shadow hover:bg-[#444] transition"
                    >
                        <div class="text-4xl mb-2">
                            {ikonaProTyp(soubor.typ)}
                        </div>
                        <div class="text-sm truncate max-w-[100%]">
                            {soubor.nazev}
                        </div>
                        <div class="text-xs text-gray-400">{soubor.datum}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
