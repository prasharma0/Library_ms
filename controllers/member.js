const express = require("express");
const Member = require("../models/member");

exports.getAllMember = async(req , res)=>{

    try {
        const allmember = await Member.find();
        res.status(200).json({
            message: "Members of the library",
            data: allmember,
        })
    } catch (err) {
        res.json({
            error: err,
        })
    }
};
exports.addMember = async(req , res)=>{
    const member = new Member({
        fullName: req.body.fullName,
        membership: req.body.membership,
    });
    try {
        const memberadded = await member.save();
        res.status(201).json({
            message: "member adding successful",
            memberadded: memberadded,
        })
    } catch (err) {
        res.json({
            error:err,
        })
    }
};
exports.getMemberById = async(req, res)=>{
    const id = req.params.id;
    try {
        const selectedmember = await Member.findById(id);
        res.status(200).json({
            message: "member found !",
            data : selectedmember,
        })
    } catch (err) {
        res.json({
            error: err, 
        })
    }
};
exports.editMemberById = async( req , res)=>{
    const id = req.params.id;
    try {
        const member = await Member.findById(id);
        member.membership = req.body.membership;
        member.author = req.body.author;
        const savemember = member.save();
        res.status(200).json({
            message: "edit successful !",
            data: savemember,
            
        })
    } catch (err) {
        res.json({
            error: err,
        })
    }
};
exports.deleteMemberById = async(req ,res)=>{
    const id = req.params.id;
    try {
        const deletemember = await Member.findByIdAndDelete(id);
        res.json({
            message: "deleted successfully !",
            data: deletemember,
        })
    } catch (err) {
        res.json({
            error: err,
        })
    }
};