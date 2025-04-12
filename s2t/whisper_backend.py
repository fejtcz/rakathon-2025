from pyannote.audio import Pipeline
import torch
import sys
import whisper
import os
import subprocess
import tempfile
import io
import time

# Korektní výpis v UTF-8 i na Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

input_file = sys.argv[1]
print(f"Spuštění přepisu pro soubor: {input_file}", file=sys.stderr)

if not os.path.exists(input_file):
    print(f"Soubor {input_file} neexistuje.", file=sys.stderr)
    sys.exit(1)

if not input_file.endswith(('.wav', '.webm', '.mp4')):
    print("Nepodporovaný formát souboru. Použijte .wav, .webm nebo .mp4.", file=sys.stderr)
    sys.exit(1)

# Start celkového časovače
start_time = time.time()

# Převod MP4 na WAV, pokud je potřeba
if input_file.endswith('.mp4') or input_file.endswith('.webm'):
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp_path = tmp.name
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error", "-i", input_file,
            "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", tmp_path
        ], check=True)
else:
    tmp_path = input_file

# Načtení modelu Whisper
model = whisper.load_model("large")

# Načtení modelu pro diarizaci z Hugging Face
pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token="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"
)

# Přesun pipeline na GPU, pokud je dostupné
pipeline.to(torch.device("cuda" if torch.cuda.is_available() else "cpu"))

with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
    #tmp_path = tmp.name

    # Převod zvuku na 16 kHz, mono, PCM
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", input_file,
        "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", tmp_path
    ], check=True)

    # Spuštění diarizace
    diarization_start = time.time()
    diarization = pipeline(tmp_path)
    diarization_end = time.time()
    print(f"Diarizace dokončena za {diarization_end - diarization_start:.2f} sekund.", file=sys.stderr)


    # Výpis výsledků diarizace
    speaker_segments = []
    for turn, _, speaker in diarization.itertracks(yield_label=True):
        speaker_segments.append({
            "start": turn.start,
            "end": turn.end,
            "speaker": speaker
        })

    # Přepis pomocí Whisper
    transcription_start = time.time()
    result = model.transcribe(tmp_path, language="cs")
    transcription_segments = result["segments"]
    transcription_end = time.time()
    print(f"Přepis dokončen za {transcription_end - transcription_start:.2f} sekund.", file=sys.stderr)


    # Kombinace přepisu a mluvčích
    combined_results = []
    for segment in transcription_segments:
        start = segment["start"]
        end = segment["end"]
        text = segment["text"]

        # Najdi odpovídajícího mluvčího
        speaker = "unknown"
        for speaker_segment in speaker_segments:
            if speaker_segment["start"] <= start <= speaker_segment["end"]:
                speaker = speaker_segment["speaker"]
                break

        combined_results.append({
            "start": start,
            "end": end,
            "speaker": speaker,
            "text": text
        })

    # Výstup celého přepisu (pouze Whisper)
    print("\nCelý přepis (pouze Whisper):\n")
    full_transcription = " ".join([segment["text"] for segment in transcription_segments])
    print(full_transcription)

    # Výstup kombinovaných výsledků
    for result in combined_results:
        print(f"[{result['speaker']}] {result['text']}")

    # Konec celkového časovače
    end_time = time.time()
    print(f"Celkový čas zpracování: {end_time - start_time:.2f} sekund.", file=sys.stderr)