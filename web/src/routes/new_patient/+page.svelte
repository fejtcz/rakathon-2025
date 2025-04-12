<script lang="ts">
    let firstName = "";
    let lastName = "";
    let birthNumber = "";
    let birthDate = "";
    let gender = "";
    let nisNumber = "";
    let insurance = "";
    let diagnosis = "";

    const genderOptions = ["Muž", "Žena", "Jiné"];
    const insuranceOptions = [
        "111 – VZP",
        "201 – VoZP",
        "205 – ČPZP",
        "207 – OZP",
        "211 – ZPMV",
    ];
    const diagnoses = [
        { code: "A00", label: "A00 – Cholera" },
        { code: "E11", label: "E11 – Diabetes mellitus 2. typu" },
        { code: "I10", label: "I10 – Hypertenze" },
        { code: "J45", label: "J45 – Astma" },
        { code: "F32", label: "F32 – Deprese" },
    ];

    function fetchFromNIS() {
        if (!birthNumber) {
            alert("Nejprve vyplňte rodné číslo.");
            return;
        }

        console.log("Načítám z NIS pro RČ:", birthNumber);
        // Simulace dat
        setTimeout(() => {
            firstName = "Jan";
            lastName = "Novák";
            birthDate = "1978-05-21";
            gender = "Muž";
            nisNumber = "123456789";
            insurance = "111 – VZP";
            diagnosis = "I10";
        }, 600);
    }

    function handleSubmit() {
        const data = {
            firstName,
            lastName,
            birthNumber,
            birthDate,
            gender,
            nisNumber,
            insurance,
            diagnosis,
        };
        console.log("Odesílám pacienta:", data);
        // TODO: volání API
    }
</script>

<div
    class="max-w-3xl mx-auto mt-10 bg-[#2e2e2e] text-white rounded-2xl p-6 shadow-lg"
>
    <h2 class="text-2xl font-semibold text-center text-[#f6ad55] mb-6">
        Nový pacient
    </h2>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block mb-1">Jméno</label>
                <input
                    type="text"
                    bind:value={firstName}
                    placeholder="Jan"
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                />
            </div>
            <div>
                <label class="block mb-1">Příjmení</label>
                <input
                    type="text"
                    bind:value={lastName}
                    placeholder="Novák"
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                />
            </div>

            <div class="md:col-span-2">
                <label class="block mb-1">Rodné číslo</label>
                <div class="flex gap-2">
                    <input
                        type="text"
                        bind:value={birthNumber}
                        placeholder="123456/7890"
                        class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                    />
                    <button
                        type="button"
                        on:click={fetchFromNIS}
                        class="bg-[#f6ad55] text-black font-semibold px-4 rounded-lg hover:bg-opacity-90 transition"
                    >
                        Stáhnout z NIS
                    </button>
                </div>
            </div>

            <div>
                <label class="block mb-1">Datum narození</label>
                <input
                    type="date"
                    bind:value={birthDate}
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                />
            </div>

            <div>
                <label class="block mb-1">Pohlaví</label>
                <select
                    bind:value={gender}
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                >
                    <option disabled value="">Vyber pohlaví</option>
                    {#each genderOptions as option}
                        <option>{option}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block mb-1">Číslo pacienta v NIS</label>
                <input
                    type="text"
                    bind:value={nisNumber}
                    placeholder="Z nemocničního systému"
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                />
            </div>

            <div>
                <label class="block mb-1">Pojišťovna</label>
                <select
                    bind:value={insurance}
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                >
                    <option disabled value="">Vyber pojišťovnu</option>
                    {#each insuranceOptions as option}
                        <option>{option}</option>
                    {/each}
                </select>
            </div>

            <div class="md:col-span-2">
                <label class="block mb-1">Hlavní diagnóza (MKN)</label>
                <select
                    bind:value={diagnosis}
                    class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
                >
                    <option disabled value="">Vyber diagnózu</option>
                    {#each diagnoses as d}
                        <option value={d.code}>{d.label}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="text-right pt-4">
            <button
                type="submit"
                class="bg-[#f6ad55] text-black font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
                Uložit pacienta
            </button>
        </div>
    </form>
</div>
