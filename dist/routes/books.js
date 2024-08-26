"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];
router.get("/books", (req, res) => {
    res.json(books);
});
router.post("/books", (req, res) => {
    const newBook = Object.assign({ id: books.length + 1 }, req.body);
    books.push(newBook);
    res.status(201).json(newBook);
});
router.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((book) => book.id === parseInt(id));
    if (index !== -1) {
        books[index] = Object.assign({ id: parseInt(id) }, req.body);
        res.json(books[index]);
    }
    else {
        res.status(404).json({ message: "Book not found" });
    }
});
router.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter((book) => book.id !== parseInt(id));
    res.status(204).send();
});
exports.default = router;
