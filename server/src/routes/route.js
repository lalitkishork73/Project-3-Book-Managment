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
  getUsersAllBook,
  getAllListBook
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
router.post("/Login", loginUser);

// ================>>Books APIs
router.post("/books/:id", authentication, createBooks);
router.get("/books/", getAllBooks);
router.get("/bookss/:bookId", getBookById);
router.get("/userbooks/:Id", authentication, getUsersAllBook);
router.put("/books/:bookId", authentication, authorisation, updateBookById);
router.delete("/books/:bookId", authentication, authorisation, deleteBookById);

// =================>>Review APIs
router.post("/books/:bookId/review", reviewByBookId);
router.put("/books/:bookId/review/:reviewId", reviewUpdateByBookId);
router.delete("/books/:bookId/review/:reviewId", reviewDeleteByBookId);
router.get("/mbooks", getAllListBook);

module.exports = router;
