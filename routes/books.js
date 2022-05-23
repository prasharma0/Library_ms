const express = require("express");
const router = express.Router();
const {
    getAllBooks,
    addBook,
    editBookById,
    findBookById,
    deleteBookById,
} = require("../controllers/books");

const {verifyUserToken}= require("../middlewares/verifyUserToken");


router.post("/", verifyUserToken , addBook);

router.get("/" , verifyUserToken, getAllBooks);

router.patch("/:id" , verifyUserToken,editBookById);

router.get("/:id" , verifyUserToken, findBookById);

router.get("/:id" , verifyUserToken, deleteBookById);

module.exports = router;