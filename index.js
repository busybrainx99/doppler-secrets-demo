require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const apiKey = process.env.API_KEY;

  // 🔐 Fail if API_KEY is missing
  if (!apiKey) {
    return res.sendFile(path.join(__dirname, "public", "missing-key.html"));
  }

  // Optional: Simulate success/fail (or always succeed for this demo)
  const isValid = true;

  if (isValid) {
    // Optionally log the last 4 characters of the API key
    const signedPart = apiKey.slice(-4);
    console.log(
      `Signed request for ${email} using key ending in: ${signedPart}`
    );
    return res.sendFile(path.join(__dirname, "public", "success.html"));
  } else {
    return res.sendFile(path.join(__dirname, "public", "failure.html"));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
