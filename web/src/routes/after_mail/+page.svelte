<script lang="ts">
    const clenove = [
        { klinika: "Klinika zobrazovacích metod", jmeno: "Lékař 1" },
        { klinika: "Onkologická klinika", jmeno: "Lékař 2" },
        { klinika: "III.chirurgická klinika", jmeno: "Lékař 3" },
        { klinika: "Ústav Patologie", jmeno: "Lékař 4" },
        { klinika: "Koordinátorka onkologické péče", jmeno: "Mgr. 1" },
    ];

    const epikriza = `Pacient po extirpaci ložiska nad hřebenem lopaty kosti kyčelní vlevo na spádové chirurgické ambulanci (anamnesticky předpokládán organizovaný hematom). Dle definitivní histologie neklasifikovaný vřetenobuněčný nízce maligní tumor. Nyní po MR ve FNM.`;

    const vysledky = [
        {
            typ: "Histologie",
            datum: "3. 4. 2021",
            misto: "FNM",
            zaver: "V jizvě recidivující dříve diagnostikovaný low grade sarkom, blíže neurčený, s necharakteristickým imunoprofilem a nižším stupněm proliferace. Okraje excize negativní. Dif.dg.: molekulární vyšetření nepodpořilo dg. low grade fibromyxoidního sarkomu (který původně v dif. dg. zvažován)",
        },
        {
            typ: "MR",
            datum: "7. 5. 2021",
            misto: "FNM",
            zaver: "tumor v levém třísle laterálně v podkoží, cystická složka se sytí – nelze vyloučit myxoidní podíl tumoru, bez známek invaze do velkých cév",
        },
    ];

    const vysetreniMdt = "ve shodě s oficiálním popisem";
    const zaver =
        "chirurgický výkon – nález indikovaný k sanačnímu výkonu, výkon ve spolupráci s plastickým chirurgem";
    const ukoly = ["termín operace", "zavolat pacientovi"];
    const prepis = `Lékař 1: Navrhuji výkon ve spolupráci s plastickým chirurgem.
Lékař 2: Souhlasím, pacient by měl být indikován co nejdříve.
Lékař 3: Doporučuji také kontrolní MR za 3 měsíce.`;
</script>

<div
    class="max-w-4xl mx-auto text-white bg-[#2e2e2e] p-6 rounded-xl space-y-6 text-sm"
>
    <h2 class="text-2xl font-bold text-[#f6ad55]">
        Zápis z MDT pacienta Jan Novák
    </h2>

    <div class="space-y-1">
        {#each clenove as clen}
            <div>
                {clen.klinika}: <span class="font-medium">{clen.jmeno}</span>
            </div>
        {/each}
    </div>

    <div>
        <h3 class="font-bold">Epikríza pacienta:</h3>
        <p class="mt-1">{epikriza}</p>
    </div>

    <div>
        <h3 class="font-bold">Relevantní vyšetření a výkony:</h3>
        <div class="mt-1 space-y-3">
            {#each vysledky as v}
                <div>
                    <span class="font-medium">{v.typ}</span>:
                    <span class="italic">{v.datum}, {v.misto}</span>,
                    <span class="font-medium">Závěr:</span>
                    {v.zaver}
                </div>
            {/each}
        </div>
    </div>

    <div>
        <h3 class="font-bold">Zobrazovací vyšetření MDT:</h3>
        <p class="mt-1">{vysetreniMdt}</p>
    </div>

    <div>
        <h3 class="font-bold">Závěr MDT:</h3>
        <p class="mt-1">{zaver}</p>
    </div>

    <div>
        <h3 class="font-bold">Úkoly:</h3>
        <ul class="list-disc list-inside mt-1">
            {#each ukoly as ukol}
                <li>{ukol}</li>
            {/each}
        </ul>
    </div>

    <div>
        <h3 class="font-bold">Přepis schůzky:</h3>
        <pre
            class="bg-[#3a3a3a] p-3 rounded mt-1 whitespace-pre-wrap">{prepis}</pre>
    </div>

    <div class="pt-6 space-y-2">
        <a
            href="https://kovia.cz/audio-schuzka"
            target="_blank"
            class="text-[#f6ad55] underline hover:text-orange-300 block"
        >
            🎧 Poslechnout záznam schůzky
        </a>
        <a
            href="https://kovia.cz/detail-schuzky"
            target="_blank"
            class="text-[#f6ad55] underline hover:text-orange-300 block"
        >
            🔍 Otevřít detail schůzky v systému Kovia
        </a>
    </div>
</div>
