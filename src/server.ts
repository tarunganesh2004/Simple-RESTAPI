import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for books
let books: { id: number; title: string; author: string }[] = [];

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Route to get all books
app.get("/books", (req, res) => {
  res.json(books); // Respond with the list of books
});

// Route to add a new book
app.post("/books", (req, res) => {
  const newBook = req.body; // Extract book data from the request body
  books.push(newBook); // Add the new book to the list
  res.status(201).json(newBook); // Respond with the added book
});

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
