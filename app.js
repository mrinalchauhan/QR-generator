const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Generate QR Code
app.post("/generate", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send("Text is required");
  }

  try {
    const qrCode = await QRCode.toDataURL(text);
    res.json({ qrCode });
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
