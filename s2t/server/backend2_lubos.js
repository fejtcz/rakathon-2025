const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer();

app.post("/records", upload.single("audio"), (req, res) => { // /api/store-transcription
  try {
    console.log("Přijatý soubor:", req.file);

    // Rozbalení JSON z klíče "data"
    const data = JSON.parse(req.body.data);

    // Validace a logování přijatých dat
    const { meetingId, caseId, uploadedById, timestamp, transcription } = data;
    console.log("Meeting ID:", meetingId);
    console.log("Case ID:", caseId);
    console.log("Uploaded By ID:", uploadedById);
    console.log("Timestamp:", timestamp);
    console.log("Transcription:", transcription.fullText);
    console.log("Transcription Flow:", transcription.flow);

    // Odpověď klientovi
    res.json({ 
      message: "Data úspěšně přijata.",
      received: {
        meetingId,
        caseId,
        uploadedById,
        timestamp,
        transcription
      }
    });
  } catch (err) {
    console.error("Chyba při zpracování dat:", err.message);
    res.status(500).json({ error: "Chyba při zpracování dat." });
  }
});

app.listen(3000, () => console.log("Testovací server běží na http://localhost:3000/api/store-transcription"));