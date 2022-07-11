const express = require("express");
const router = express.Router();

//<=========================== Importing Modules =========================>//

const { createUser, loginUser } = require("../controllers/userController");
const {
  createBooks,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/booksController");
const {
  reviewByBookId,
  reviewUpdateByBookId,
  reviewDeleteByBookId,
} = require("../controllers/reviewController");
const { authentication, authorisation } = require("../middlewares/auth");

//<=========================== API && Methods =========================>//

// ================>>User APIs
router.post("/register", createUser);
router.post("/login", loginUser);

// ================>>Books APIs
router.post("/books", authentication, createBooks);
router.get("/books", authentication, getAllBooks);
router.get("/books/:bookId", authentication, getBookById);
router.put("/books/:bookId", authentication, authorisation, updateBookById);
router.delete("/books/:bookId", authentication, authorisation, deleteBookById);

// =================>>Review APIs
router.post("/books/:bookId/review", reviewByBookId);
router.put("/books/:bookId/review/:reviewId", reviewUpdateByBookId);
router.delete("/books/:bookId/review/:reviewId", reviewDeleteByBookId);

module.exports = router;
