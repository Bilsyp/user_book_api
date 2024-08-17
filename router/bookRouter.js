import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} from "../controllers/bookControllers.js";
const router = express.Router();

const bookRouter = router
  .get("/books", authenticateToken, getBooks)
  .get("/books/:id", authenticateToken, getBookById)
  .post("/books", authenticateToken, createNewBook)
  .put("/books/:id", authenticateToken, updateBook)
  .delete("/books/:id", authenticateToken, deleteBook);

export default bookRouter;
