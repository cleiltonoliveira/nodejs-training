import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
.get("/authors", AuthorController.listAuthors)
.post("/authors", AuthorController.createAuthor)
.put("/authors/:id", AuthorController.updateAuthor)
.get("/authors/:id", AuthorController.listAuthorById)
.delete("/authors/:id", AuthorController.deleteAuthor);

export default router;