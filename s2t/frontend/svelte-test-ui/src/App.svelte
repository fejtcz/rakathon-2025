<script>
  import { onMount } from "svelte";

  let audioFile = null;
  let chunks = [];
  let mediaRecorder = null;
  let stream = null;
  let isRecording = false;

  let metadata = {
    meetingId: 1,
    caseId: 1,
    uploadedById: 1,
    timestamp: new Date().toISOString()
  };

  let serverResponse = null;
  let errorMessage = null;
  let fullText = ""; // Celý text přepisu
  let speakerFlow = []; // Text se speakery
  let isLoading = false; // Indikátor načítání

  // Funkce pro spuštění nahrávání
  const startRecording = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.start();
      isRecording = true;
    } catch (error) {
      errorMessage = "Nelze spustit nahrávání: " + error.message;
    }
  };

  // Funkce pro zastavení nahrávání
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        audioFile = new File([blob], "recording.webm", { type: "audio/webm" });
        isRecording = false;
        stream.getTracks().forEach((track) => track.stop());
      };
    }
  };

  // Funkce pro odeslání dat na server
  const sendData = async () => {
    if (!audioFile) {
      errorMessage = "Vyberte nebo nahrajte zvukový soubor.";
      return;
    }

    isLoading = true; // Nastavení načítání na true
    errorMessage = null;

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("metadata", JSON.stringify(metadata));

    try {
      const response = await fetch("http://localhost:3010/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Chyba serveru: ${response.statusText}`);
      }

      const data = await response.json();
      fullText = data.transcription?.fullText || "Celý text nebyl nalezen.";
      speakerFlow = data.transcription?.flow || [];
    } catch (error) {
      errorMessage = error.message;
      fullText = "";
      speakerFlow = [];
    } finally {
      isLoading = false; // Nastavení načítání na false
    }
  };
</script>

<style>
  :global(body) {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
    color: #333;
  }

  h1 {
    text-align: center;
    color: #4a90e2;
    margin-top: 20px;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .form-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  button {
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
  }

  button:hover {
    background-color: #357ab8;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .loading {
    font-size: 1.2em;
    color: #4a90e2;
    text-align: center;
    margin-top: 20px;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 20px;
  }

  .response {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .response h2 {
    color: #4a90e2;
    margin-bottom: 10px;
  }

  .response ul {
    list-style: none;
    padding: 0;
  }

  .response li {
    margin-bottom: 10px;
  }

  .response li strong {
    color: #333;
  }

  .response li .speaker {
    margin-left: 10px;
    color: #555;
  }
</style>

<div class="container">
  <h1>Testovací UI pro přepis</h1>

  <div class="form-container">
    <div class="form-group">
      <label for="audio">Zvukový soubor:</label>
      <input type="file" id="audio" accept="audio/*" on:change="{(e) => (audioFile = e.target.files[0])}" />
    </div>

    <div class="form-group">
      <label for="meetingId">Meeting ID:</label>
      <input type="number" id="meetingId" bind:value="{metadata.meetingId}" />
    </div>

    <div class="form-group">
      <label for="caseId">Case ID:</label>
      <input type="number" id="caseId" bind:value="{metadata.caseId}" />
    </div>

    <div class="form-group">
      <label for="uploadedById">Uploaded By ID:</label>
      <input type="number" id="uploadedById" bind:value="{metadata.uploadedById}" />
    </div>

    <div class="controls">
      {#if isRecording}
        <button on:click="{stopRecording}">Zastavit nahrávání</button>
      {:else}
        <button on:click="{startRecording}">Spustit nahrávání</button>
      {/if}
    </div>

    <div>
      <button on:click="{sendData}" disabled="{isLoading}">Odeslat</button>
    </div>
  </div>

  {#if isLoading}
    <p class="loading">Zpracovávám data, prosím čekejte...</p>
  {/if}

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if fullText}
    <div class="response">
      <h2>Celý text přepisu:</h2>
      <p>{fullText}</p>
    </div>
  {/if}

  {#if speakerFlow.length > 0}
    <div class="response">
      <h2>Text se speakery:</h2>
      <ul>
        {#each speakerFlow as segment}
          <li>
            <strong>{segment.speaker}:</strong>
            <span class="speaker">{segment.text}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>