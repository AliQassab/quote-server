import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Quotes data - formatted consistently for better git version control
// Each quote object is on separate lines for easier diff tracking
const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
  },
];

// Track last quote to avoid consecutive duplicates
let lastQuoteIndex = -1;

// Helper function to pick random quote (avoiding consecutive duplicates)
function pickRandomQuote() {
  if (quotes.length <= 1) {
    return quotes[0];
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastQuoteIndex);

  lastQuoteIndex = randomIndex;
  return quotes[randomIndex];
}

// GET endpoint - Serve frontend
app.get("/", (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// GET endpoint - Get a random quote (JSON)
app.get("/api/quote", (req, res) => {
  console.log("Received a request for a quote");
  const quote = pickRandomQuote();
  res.json({
    quote: quote.quote,
    author: quote.author,
  });
});

// POST endpoint - Add a new quote
app.post("/api/quote", (req, res) => {
  console.log("Received a request to add a quote");

  const { quote, author } = req.body;

  // Validation
  if (!quote || !author) {
    return res.status(400).json({
      error: "Both 'quote' and 'author' fields are required",
    });
  }

  if (typeof quote !== "string" || typeof author !== "string") {
    return res.status(400).json({
      error: "Both 'quote' and 'author' must be strings",
    });
  }

  if (quote.trim() === "" || author.trim() === "") {
    return res.status(400).json({
      error: "Both 'quote' and 'author' cannot be empty",
    });
  }

  // Add the new quote
  const newQuote = {
    quote: quote.trim(),
    author: author.trim(),
  };

  quotes.push(newQuote);

  console.log(`Added new quote: "${newQuote.quote}" by ${newQuote.author}`);

  res.json({
    message: "Quote added successfully",
    quote: newQuote,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Quote server listening on port ${port}`);
  console.log(`Visit http://localhost:${port} to open the app`);
});
