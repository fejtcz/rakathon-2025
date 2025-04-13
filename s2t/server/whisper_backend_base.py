import sys
import whisper
import os
import subprocess
import tempfile
import io

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

model = whisper.load_model("large")

with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
    tmp_path = tmp.name
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", input_file,
        "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", tmp_path
    ], check=True)

    result = model.transcribe(tmp_path, language="cs")
    print(result["text"])
    #os.remove(tmp_path)
