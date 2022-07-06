const { Router } = require("express");
const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/userController");
const { createBooks, getAllBooks, getBookById, updateBookById, deleteBookById } = require("../controllers/booksController");
const { reviewByBookId, reviewUpdateByBookId, reviewDeleteByBookId } = require("../controllers/reviewController");
const { authentication, authorisation } = require("../middlewares/auth");

// User APIs
router.post('/register', createUser);
router.post('/login', loginUser);

// Books APIs
router.post('/books', createBooks);
router.get('/books', getAllBooks);
router.get('/books/:bookId', getBookById);
router.put('/books/:bookId', updateBookById);
router.delete('/books/:bookId', deleteBookById);

// Review APIs
router.post('/books/:bookId/review', reviewByBookId);
router.put('/books/:bookId/review/:reviewId', reviewUpdateByBookId);
router.delete('/books/:bookId/review/:reviewId', reviewDeleteByBookId);


module.exports = router;