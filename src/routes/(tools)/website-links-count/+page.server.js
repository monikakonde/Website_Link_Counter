import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/fetch-links", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = [];
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      const text = $(element).text().trim();
      if (href) {
        const fullUrl = new URL(href, url).href; // Construct the full URL
        links.push({ href: fullUrl, text });
      }
    });
    res.json(links);
  } catch (error) {
    console.error(`Error fetching the HTML content from ${url}:`, error);
    res.status(500).send("Error fetching the links");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
