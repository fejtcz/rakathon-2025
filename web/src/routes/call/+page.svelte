<script lang="ts">
  import { onMount, tick } from "svelte";

  let localVideo: HTMLVideoElement;
  let remoteVideos: { id: string; stream: MediaStream; el?: HTMLVideoElement }[] = [];

  const wsUrl = "wss://kovio-i84aumxf.livekit.cloud";
  const apiUrl = "http://localhost:3000/livecall/token";

  let room;
  let connected = false;

  function generateRandomString(length: number = 3): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async function startCall() {
    const LiveKit = await import("livekit-client");

    let usrid = generateRandomString();
    const res = await fetch(
      `${apiUrl}?room=meeting-room-123&userId=${usrid}&userName=MUDR.%20Novakova`
    );
    const { token } = await res.json();

    const audioTrack = await LiveKit.createLocalAudioTrack();
    const videoTrack = await LiveKit.createLocalVideoTrack();

    room = new LiveKit.Room();

    room.on("trackSubscribed", (track, publication, participant) => {
      if (track.kind === "video") {
        const stream = new MediaStream([track.mediaStreamTrack]);
        remoteVideos = [
          ...remoteVideos,
          { id: participant.identity + publication.trackSid, stream }
        ];
      }
    });

    room.on("trackUnsubscribed", (track, publication, participant) => {
      remoteVideos = remoteVideos.filter(
        (v) => v.id !== participant.identity + publication.trackSid
      );
    });

    await room.connect(wsUrl, token, {
      audio: false,
      video: false
    });

    await room.localParticipant.publishTrack(audioTrack);
    await room.localParticipant.publishTrack(videoTrack);

    connected = true;
    await tick();

    localVideo.srcObject = new MediaStream([videoTrack.mediaStreamTrack]);
    localVideo.play();
  }

  $: {
    for (const video of remoteVideos) {
      if (video.el) {
        video.el.srcObject = video.stream;
        video.el.play();
      }
    }
  }
</script>

{#if !connected}
  <button on:click={startCall} class="bg-[#f6ad55] text-black px-4 py-2 rounded">
    Připojit se k hovoru
  </button>
{:else}
  <div class="flex flex-wrap gap-4 mt-4">
    <!-- Lokální video -->
    <video
      bind:this={localVideo}
      autoplay
      playsinline
      muted
      class="w-[400px] h-[225px] rounded bg-black"
    >
      <track kind="captions" />
    </video>

    <!-- Remote videa -->
    {#each remoteVideos as video (video.id)}
      <video
        bind:this={video.el}
        autoplay
        playsinline
        class="w-[400px] h-[225px] rounded bg-black"
      >
        <track kind="captions" />
      </video>
    {/each}
  </div>
{/if}
