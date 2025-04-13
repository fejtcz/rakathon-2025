// === server/server.js ===
require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios"); // Pro odesílání HTTP požadavků
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });
const PORT = process.env.PORT || 3010;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/records"; // /api/store-transcription

if (!BACKEND_URL) {
  console.error("BACKEND_URL není nastavena v .env souboru.");
  process.exit(1);
}

app.post("/api/transcribe", upload.fields([
  { name: "audio", maxCount: 1 },
  { name: "metadata", maxCount: 1 }
]), (req, res) => {
  const audioPath = req.files.audio[0].path;
  const metadataRaw = req.body.metadata;
  let metadata = {};
  try {
    metadata = JSON.parse(metadataRaw);
  } catch (e) {
    console.warn("Neplatná metadata, používám prázdnou strukturu.");
    metadata = {
      meetingId: 1,
      caseId: 1,
      uploadedById: 1,
      timestamp: new Date().toISOString()
    };
  }

  // Generování timestampu ve formátu YYYYMMDD_HHMMSS
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "").replace("T", "_").slice(0, 15);
  const savedAudioPath = path.join(
    __dirname,
    "uploads",
    `${timestamp}_${metadata.meetingId || "unknown"}.webm`
  );
  
  try {
    fs.renameSync(audioPath, savedAudioPath);
  } catch (err) {
    console.error("Chyba při ukládání souboru:", err.message);
    return res.status(500).json({ error: "Chyba při ukládání souboru." });
  }

  console.log("Audio soubor uložen jako:", savedAudioPath);

  const scriptPath = path.join(__dirname, "whisper_backend.py");
  console.log("Přijat audio soubor:", savedAudioPath);

  execFile("python", [scriptPath, savedAudioPath], { encoding: "utf8" }, async (error, stdout, stderr) => {
    //fs.unlinkSync(audioPath); // puvodne jsem soubor rovnou mazal po zpracovani, ale chceme jej ukladat
    if (error) {
      console.error("Chyba při přepisu:", stderr);
      return res.status(500).json({ error: "Chyba při přepisu." });
    }

    //const translation = stdout.trim(); // Překlad z Whisper
    //console.log("Překlad dokončen:", translation);
    // Parsování výstupu z Python skriptu
    const pythonOutput = JSON.parse(stdout.trim());
    const fullTranscription = pythonOutput.full_transcription; // Celý text
    const speakerTranscription = pythonOutput.speaker_transcription; // Text se speakery

    console.log("Překlad dokončen. Celý text:", fullTranscription);
    console.log("Překlad se speakery:", speakerTranscription);

    // Přidáme další metadata o zpracování
    /*const processingMetadata = {
      processedAt: new Date().toISOString(),
      fileSize: fs.statSync(savedAudioPath).size,
      sessionId: metadata.sessionId || "unknown",
      userId: metadata.userId || "unknown"
    };*/

    // Transformace speakerTranscription na požadovanou strukturu ve flow
    const flow = speakerTranscription.map(segment => ({
      speaker: segment.speaker,
      text: segment.text
    }));

    // Připravíme JSON payload podle struktury z curl
    const jsonPayload = {
      meetingId: metadata.meetingId || 1,
      caseId: metadata.caseId || 1,
      uploadedById: metadata.uploadedById || 1,
      timestamp: metadata.timestamp || new Date().toISOString(),
      transcription: {
        fullText: fullTranscription, // Celý text bez speakerů
        /*flow: translation.split("\n").map((line, index) => {
          const match = line.match(/^\[(.*?)\]\s*(.*)$/); // Extrahuje mluvčího a text
          return {
            speaker: match ? match[1] : `unknown_${index + 1}`,
            text: match ? match[2] : line
          };
        })*/
       flow: flow // Texty postupně podle mluvčích
      },
      filename: path.basename(savedAudioPath)
    };

    // Připravíme JSON payload
    /*const jsonPayload = {
      translation,
      metadata: processingMetadata
    };*/

    try {
      // Připravíme FormData pro odeslání
      const formData = new FormData();
      formData.append("file", fs.createReadStream(savedAudioPath)); // Zvukový soubor
      formData.append("data", JSON.stringify(jsonPayload)); // Metadata a překlad jako JSON
  
      // Odeslání na backendový endpoint (port 3000) - Lubošův
      const backendResponse = await axios.post(BACKEND_URL, formData, {
        headers: formData.getHeaders(),
      });
      console.log("Data úspěšně odeslána na backendový endpoint:", backendResponse.data);     
  
      // Odpověď klientovi
      return res.json({ message: "Přepis a data úspěšně zpracována a odeslána.", fullTranscription });
    } catch (err) {
      console.error("Chyba při odesílání dat:", err.message);
      return res.status(500).json({ error: "Chyba při odesílání dat." });
    }
  });
});

app.listen(PORT, () => console.log(`Mikroservisa pro transcribe běží na http://localhost:${PORT}/api/transcribe`));