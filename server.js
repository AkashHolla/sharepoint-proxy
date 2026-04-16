import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/excel", async (req, res) => {
  try {
    const url = req.query.url;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const buffer = await response.arrayBuffer();

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});