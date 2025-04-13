<script lang="ts">
    import { onMount } from "svelte";
    import { tick } from "svelte";

    let localVideo: HTMLVideoElement;
    const wsUrl = "wss://kovio-i84aumxf.livekit.cloud";

    let room;
    let connected = false;

    async function startCall() {
        const LiveKit = await import("livekit-client");

        // 🔐 Získej token z backendu
        const res = await fetch(
            `http://localhost:3000/livecall/token?room=meeting-room-123&userId=dr.novakova&userName=MUDR.%20Novakova`,
        );
        const { token } = await res.json();

        const audioTrack = await LiveKit.createLocalAudioTrack();
        const videoTrack = await LiveKit.createLocalVideoTrack();

        room = new LiveKit.Room();

        await room.connect(wsUrl, token, {
            audio: false,
            video: false,
        });

        await room.localParticipant.publishTrack(audioTrack);
        await room.localParticipant.publishTrack(videoTrack);

        connected = true;

        await tick(); // ⏳ počkej, než se video objeví v DOMu

        localVideo.srcObject = new MediaStream([videoTrack.mediaStreamTrack]);
        localVideo.play();
    }
</script>

{#if !connected}
    <button
        on:click={startCall}
        class="bg-[#f6ad55] text-black px-4 py-2 rounded"
    >
        Připojit se k hovoru
    </button>
{:else}
    <video
        bind:this={localVideo}
        autoplay
        playsinline
        muted
        class="w-full rounded bg-black mt-4"
    >
        <track kind="captions" />
    </video>
{/if}
