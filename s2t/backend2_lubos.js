const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer();

app.post("/api/store-transcription", upload.single("audio"), (req, res) => {
  try {
    console.log("Přijatý soubor:", req.file);

    // Rozbalení JSON z klíče "data"
    const { translation, metadata } = JSON.parse(req.body.data);
    console.log("Překlad:", translation);
    console.log("Metadata:", metadata);

    res.json({ message: "Data úspěšně přijata." });
  } catch (err) {
    console.error("Chyba při zpracování dat:", err.message);
    res.status(500).json({ error: "Chyba při zpracování dat." });
  }
});

app.listen(3000, () => console.log("Testovací server běží na http://localhost:3000/api/receive-data"));