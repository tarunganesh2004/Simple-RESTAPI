import { Router, Request, Response } from "express";

const router = Router();

let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

router.get("/books", (req: Request, res: Response) => {
  res.json(books);
});

router.post("/books", (req: Request, res: Response) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === parseInt(id));

  if (index !== -1) {
    books[index] = { id: parseInt(id), ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  books = books.filter((book) => book.id !== parseInt(id));
  res.status(204).send();
});

export default router;
