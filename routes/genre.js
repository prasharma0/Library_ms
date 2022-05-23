const express = require("express");
const router = express.Router();
const {
    getAllGenre,
    addGenre,
    editGenre,
    getGenreById,
    deleteGenre,
} = require("../controllers/genre");

const {verifyUserToken}= require("../middlewares/verifyUserToken");


router.post("/", verifyUserToken , addGenre);

router.get("/" , verifyUserToken, getAllGenre);

router.patch("/:id" , verifyUserToken,editGenre);

router.get("/:id" , verifyUserToken, getGenreById);

router.get("/:id" , verifyUserToken, deleteGenre);

module.exports = router;