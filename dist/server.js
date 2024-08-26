"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// In-memory store for books
let books = [];
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
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
    res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
