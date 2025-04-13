const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    // Smyšlená data
    const fakeAudioPath = path.join(__dirname, "uploads/vystup_rozhovor_venku_2.wav"); // Ujisti se, že soubor existuje
    const fakeJsonPayload = {
      meetingId: 1,
      caseId: 1,
      uploadedById: 1,
      timestamp: new Date().toISOString(),
      transcription: {
        fullText: "Toto je smyšlený text přepisu.",
        flow: [
          { speaker: "SPEAKER_01", text: "Dobrý den." },
          { speaker: "SPEAKER_02", text: "Jak se máte?" }
        ],
      filename: "record.mp3"
      }
    };

    // Připravíme FormData pro odeslání
    const formData = new FormData();
    formData.append("file", fs.createReadStream(fakeAudioPath)); // Smyšlený zvukový soubor
    formData.append("data", JSON.stringify(fakeJsonPayload)); // Smyšlená JSON data

    // Odeslání na backendový endpoint
    const backendResponse = await axios.post("http://localhost:3000/records", formData, {
      headers: formData.getHeaders(),
    });

    console.log("Testovací data úspěšně odeslána na backendový endpoint:");
    console.log(backendResponse.data);
  } catch (err) {
    console.error("Chyba při odesílání testovacích dat:", err.message);
    if (err.response) {
      console.error("Odpověď serveru:", err.response.data);
    }
  }
})();