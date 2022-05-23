const express = require("express");
const {
    getAllMember,
    addMember,
    editMemberById,
    getMemberById,
    deleteMemberById,
} = require("../controllers/member");

const {verifyUserToken}= require("../middlewares/verifyUserToken");
const router = express.Router();

router.post("/", verifyUserToken , addMember);

router.get("/" , verifyUserToken, getAllMember);

router.patch("/:id" , verifyUserToken,editMemberById);

router.get("/:id" , verifyUserToken, getMemberById);

router.delete("/:id" , verifyUserToken, deleteMemberById);

module.exports = router;