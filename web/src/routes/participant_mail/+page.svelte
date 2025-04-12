<script lang="ts">
    export let date = "2025-04-14T14:00:00";
    export let location = "Zasedací místnost B";
    export let patientName = "Jan Novák";
    export let meetingLink = "/schuzky/123";

    function confirmAttendance() {
        console.log("✅ Účast potvrzena");
        // TODO: Odeslat potvrzení na backend
    }

    function declineAttendance() {
        console.log("❌ Účast odmítnuta");
        // TODO: Odeslat odmítnutí na backend
    }

    function formatDateTime(iso: string) {
        const d = new Date(iso);
        return d.toLocaleString("cs-CZ", {
            dateStyle: "full",
            timeStyle: "short",
        });
    }
</script>

<div
    class="max-w-xl mx-auto mt-10 bg-[#2e2e2e] text-white rounded-2xl p-6 shadow-xl space-y-6"
>
    <h2 class="text-2xl font-bold text-center text-[#f6ad55]">
        Pozvánka na multidisciplinární schůzku
    </h2>

    <div class="space-y-2 text-center">
        <p><strong>🕒 Kdy:</strong> {formatDateTime(date)}</p>
        <p><strong>📍 Kde:</strong> {location}</p>
        <p><strong>👤 Pacient:</strong> {patientName}</p>
    </div>

    <div class="text-center">
        <a
            href={meetingLink}
            class="underline text-[#f6ad55] hover:text-[#ffbf70] transition"
            >Zobrazit detail schůzky</a
        >
    </div>

    <div class="flex flex-col sm:flex-row gap-4 pt-4">
        <button
            on:click={confirmAttendance}
            class="flex-1 bg-[#f6ad55] text-black font-semibold px-6 py-3 rounded-lg text-lg hover:bg-opacity-90 transition"
        >
            ✅ Potvrzuji účast
        </button>
        <button
            on:click={declineAttendance}
            class="flex-1 bg-red-600 text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-red-500 transition"
        >
            ❌ Nedorazím
        </button>
    </div>
</div>
