import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Recreate __dirname for ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Routes
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// Quotes
const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  { quote: "I should have been more kind.", author: "Clive James" },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
  },
];

const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

app.get("/", (_, res) => res.json(randomQuote()));

app.post("/", (req, res) => {
  const { quote, author } = req.body;
  if (!quote?.trim() || !author?.trim()) {
    return res
      .status(400)
      .json({ error: "Both 'quote' and 'author' are required" });
  }
  const newQuote = { quote: quote.trim(), author: author.trim() };
  quotes.push(newQuote);
  res.json({ message: "Quote added", quote: newQuote });
});

// Start
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
