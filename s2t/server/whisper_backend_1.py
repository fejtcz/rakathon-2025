import sys
import whisper
import os
import subprocess
import tempfile
import io
from pyannote.audio import Pipeline

# TODO: premapovani speakeru 

# Korektní výpis v UTF-8 i na Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

input_file = sys.argv[1]
print(f"Spuštění přepisu pro soubor: {input_file}", file=sys.stderr)  # Logování na stderr místo stdout

if not os.path.exists(input_file):
    print(f"Soubor {input_file} neexistuje.", file=sys.stderr)
    sys.exit(1)

if not input_file.endswith(('.wav', '.webm')):
    print("Nepodporovaný formát souboru. Použijte .wav nebo .webm.", file=sys.stderr)
    sys.exit(1)

model = whisper.load_model("medium")

# Načtení modelu pro diarizaci
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization")

with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
    tmp_path = tmp.name

    ## Zpracování zvuku
    # První krok: Vyčištění zvuku pomocí filtrů - odstraníme tím nf šum (hluk, brum, vibrace) a vf šum (šum na pozadí)
    cleaned_path = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", input_file,
        "-af", "highpass=f=200, lowpass=f=3000", cleaned_path
    ], check=True)

    # Druhý krok: Převod na 16 kHz, mono, PCM
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", cleaned_path,
        "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", tmp_path
    ], check=True)

    # Smazání dočasného vyčištěného souboru
    #os.remove(cleaned_path)
    #subprocess.run([
    #    "ffmpeg", "-y", "-loglevel", "error", "-i", input_file,
    #    "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", tmp_path
    #], check=True)

    # Spuštění diarizace
    diarization = pipeline(tmp_path)
    #diarization = pipeline(tmp_path, num_speakers=2)  # TODO: pohrat si s nastavenim poctu speakeru

    # Výpis výsledků diarizace
    speaker_segments = []
    for turn, _, speaker in diarization.itertracks(yield_label=True):
        speaker_segments.append({
            "start": turn.start,
            "end": turn.end,
            "speaker": speaker
        })

    result = model.transcribe(tmp_path, language="cs")
    transcription_segments = result["segments"]

    print(result["text"])

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

    # Výstup kombinovaných výsledků
    for result in combined_results:
        print(f"[{result['speaker']}] {result['text']}")
