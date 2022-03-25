import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
.get("/books", BookController.listBooks)
.get("/books/search", BookController.listBookByEditora)
.post("/books", BookController.createBook)
.put("/books/:id", BookController.updateBook)
.get("/books/:id", BookController.listBookById)
.delete("/books/:id", BookController.deleteBook);

export default router;