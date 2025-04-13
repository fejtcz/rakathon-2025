<script lang="ts">
    let meetingDateTime = "";
    let boardType = "";
    let location = "";
    let reminderHours = 12;
    let extraNotes: string[] = [];

    const boardOptions = [
        "ORL",
        "Horní GIT",
        "Hrudní",
        "Mammární",
        "Plicní",
        "Urologický",
        "Neurologický",
        "Sarcomaboard",
        "Onkogynekologický",
        "Dolní GIT",
    ];

    const userDirectory = [
        {
            id: 1,
            firstName: "MUDr. Anna",
            lastName: "Novotná",
            email: "",
            phone: "",
            specialty: "Onkologie",
            avatar: "https://i.pravatar.cc/100?u=1",
        },
        {
            id: 2,
            firstName: "MUDr. Tomáš",
            lastName: "Bartoš",
            email: "",
            phone: "",
            specialty: "Chirurgie",
            avatar: "https://i.pravatar.cc/100?u=2",
        },
        {
            id: 3,
            firstName: "MUDr. Lucie",
            lastName: "Krejčí",
            email: "",
            phone: "",
            specialty: "Radiologie",
            avatar: "https://i.pravatar.cc/100?u=3",
        },
        {
            id: 4,
            firstName: "MUDr. Petr",
            lastName: "Svoboda",
            email: "",
            phone: "",
            specialty: "Urologie",
            avatar: "https://i.pravatar.cc/100?u=4",
        },
        {
            id: 5,
            firstName: "MUDr. Eva",
            lastName: "Dvořáková",
            email: "",
            phone: "",
            specialty: "Gynekologie",
            avatar: "https://i.pravatar.cc/100?u=5",
        },
        {
            id: 6,
            firstName: "MUDr. Jan",
            lastName: "Král",
            email: "",
            phone: "",
            specialty: "ORL",
            avatar: "https://i.pravatar.cc/100?u=6",
        },
        {
            id: 7,
            firstName: "MUDr. Jana",
            lastName: "Černá",
            email: "",
            phone: "",
            specialty: "Plicní",
            avatar: "https://i.pravatar.cc/100?u=7",
        },
        {
            id: 8,
            firstName: "MUDr. Martin",
            lastName: "Novák",
            email: "",
            phone: "",
            specialty: "Neurologie",
            avatar: "https://i.pravatar.cc/100?u=8",
        },
        {
            id: 9,
            firstName: "MUDr. Kateřina",
            lastName: "Horáková",
            email: "",
            phone: "",
            specialty: "Onkologie",
            avatar: "https://i.pravatar.cc/100?u=9",
        },
        {
            id: 10,
            firstName: "MUDr. David",
            lastName: "Procházka",
            email: "",
            phone: "",
            specialty: "Chirurgie",
            avatar: "https://i.pravatar.cc/100?u=10",
        },
        {
            id: 11,
            firstName: "MUDr. Petra",
            lastName: "Novotná",
            email: "",
            phone: "",
            specialty: "Radiologie",
            avatar: "https://i.pravatar.cc/100?u=11",
        },
        {
            id: 12,
            firstName: "MUDr. Jakub",
            lastName: "Beneš",
            email: "",
            phone: "",
            specialty: "Urologie",
            avatar: "https://i.pravatar.cc/100?u=12",
        },
        {
            id: 13,
            firstName: "MUDr. Tereza",
            lastName: "Kovářová",
            email: "",
            phone: "",
            specialty: "Gynekologie",
            avatar: "https://i.pravatar.cc/100?u=13",
        },
        {
            id: 14,
            firstName: "MUDr. Václav",
            lastName: "Čech",
            email: "",
            phone: "",
            specialty: "ORL",
            avatar: "https://i.pravatar.cc/100?u=14",
        },
        {
            id: 15,
            firstName: "MUDr. Barbora",
            lastName: "Fialová",
            email: "",
            phone: "",
            specialty: "Plicní",
            avatar: "https://i.pravatar.cc/100?u=15",
        },
        {
            id: 16,
            firstName: "MUDr. Filip",
            lastName: "Havlíček",
            email: "",
            phone: "",
            specialty: "Neurologie",
            avatar: "https://i.pravatar.cc/100?u=16",
        },
    ];

    let selectedUsers: number[] = [];

    function toggleUser(id: number) {
        if (selectedUsers.includes(id)) {
            selectedUsers = selectedUsers.filter((uid) => uid !== id);
        } else {
            selectedUsers.push(id);
        }
    }

    $: selectedMembers = userDirectory.filter((user) =>
        selectedUsers.includes(user.id),
    );

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
</script>

<div
    class="max-w-6xl mx-auto mt-10 bg-[#2e2e2e] text-white rounded-2xl p-6 shadow-lg"
>
    <h2 class="text-2xl font-semibold text-center text-[#f6ad55] mb-6">
        Plánování nové schůzky
    </h2>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <!-- Datum a čas -->
        <div>
            <label class="block mb-1">Datum a čas začátku</label>
            <input
                type="datetime-local"
                bind:value={meetingDateTime}
                class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
            />
        </div>

        <!-- Board -->
        <div>
            <label class="block mb-1">Název (typ boardu)</label>
            <select
                bind:value={boardType}
                class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
            >
                <option disabled selected value="">Vyber...</option>
                {#each boardOptions as option}
                    <option>{option}</option>
                {/each}
            </select>
        </div>

        <!-- Místo -->
        <div>
            <label class="block mb-1">Místo setkání</label>
            <input
                type="text"
                bind:value={location}
                placeholder="Např. zasedačka B"
                class="w-full rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
            />
        </div>

        <!-- Výběr členů týmu -->
        <div>
            <label class="block mb-2 text-lg"
                >Členové týmu ({selectedUsers.length} vybráno)</label
            >
            <div
                class="grid gap-4"
                style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));"
            >
                {#each userDirectory as user}
                    <div
                        on:click={() => toggleUser(user.id)}
                        class="relative cursor-pointer flex flex-col items-center text-center p-2 rounded-xl transition
          {selectedUsers.includes(user.id)
                            ? 'bg-[#444] shadow-md'
                            : 'bg-[#3a3a3a] hover:bg-[#4a4a4a]'}"
                    >
                        <img
                            src={user.avatar}
                            alt={user.firstName}
                            class="w-16 h-16 rounded-full mb-1 object-cover transition-opacity duration-200
            {selectedUsers.includes(user.id) ? 'opacity-100' : 'opacity-80'}"
                        />
                        <div
                            class="text-sm px-1 rounded transition-colors duration-200
            {selectedUsers.includes(user.id)
                                ? 'bg-[#f6ad55] text-black font-semibold'
                                : 'text-white'}"
                        >
                            {user.firstName}
                            {user.lastName}
                        </div>
                        {#if selectedUsers.includes(user.id)}
                            <div
                                class="absolute top-1 right-1 bg-[#f6ad55] text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
                            >
                                ✓
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>

        <!-- Pozvánka -->
        <div>
            <label class="block mb-1">Pozvánku poslat (hodin předem)</label>
            <input
                type="number"
                min="1"
                bind:value={reminderHours}
                class="flex-2 rounded bg-[#3a3a3a] text-white px-3 py-2 border border-[#555]"
            />
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
</div>

        <!-- Submit -->
        <div class="text-right pt-4">
            <button
                type="submit"
                class="bg-[#f6ad55] text-black font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
                Naplánovat schůzku
            </button>
        </div>
    </form>
</div>
