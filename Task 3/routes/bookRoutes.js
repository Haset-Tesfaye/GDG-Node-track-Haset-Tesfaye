const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const validateBook = require("../middleware/validateBook");

router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", validateBook, bookController.createBook);

module.exports = router;
