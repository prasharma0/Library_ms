const express = require("express");
const Book = require("../models/book");

exports.getAllBooks = async (req , res)=>{
    try {
        const allBooks = await Book.find().populate("category");
        res.status(200).json({
            data: allBooks,
        });
        
    } catch (err) {
        req.send({
            error:err,
        });
    }
};
exports.addBook = async (req , res)=>{
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
    });
    try {
        const savedBook = await book.save();
        res.status(200).json({
            message: "book saved !",
            savedBook : savedBook, 
        })

    } catch (err) { 
        res.json({
            error: err,
        });
    }
};
exports.editBookById = async (req , res)=>{
    const id = req.params.id;
    
    try {
        const book = await Book.findById(id);
        book.title = req.body.title;
        book.author = req.body.author;
        book.category = req.body.category;
        const savedBook = await book.save();
        res. json({
            message: "edited successfully",
            savedBook: savedBook,
        })
    } catch (err) {
        res.json({
            
            error: err,
        });
        
    }

};
exports.findBookById = async( req , res)=>{
    const id = req.params.id;
    try {
       const book =await Book.findById(id);
       res.status(200).json({
           data: book,
       });
    } catch (err) {
        res.status(400).json({
            message: "An error occured !",
            error: err,
        })
    }
}

exports.deleteBookById = async(req , res)=>{
    const id = req.params.id;
    try {
        const deleteBookById = await Book.findByIdAndDelete(id);
        res.json({
            message : "delete successful",
            deleteBookById : deleteBookById,
        })
    } catch (err){
        res.json({
           error: err,
        });
    }
};
