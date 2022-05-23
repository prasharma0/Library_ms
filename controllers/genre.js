const express = require("express");
const Genre = require("../models/genre");

exports.getAllGenre = async (req , res)=>{
    try {
        const allgenre = await Genre.find();
        res.status(200).json({
            data: allgenre,
        });
        
    } catch (err) {
        req.send({
            error:err,
        });
    }
};
exports.addGenre = async (req , res)=>{
    const genre = new Genre({
       genre: req.body.genre,
    });
    try {
        const savegenre = await genre.save();
        res.status(200).json({
            message: "genre saved successfully !",
            savedgenre : savegenre,
        })

    } catch (err) {
        res.json({
            error: err,
        });
    }
};
exports.editGenre = async (req , res)=>{
    const id = req.params.id;
    
    try {
        const genre = await Genre.findById(id);
        genre.genre = req.body.genre;
        const editedGenre = await genre.save();
        res. json({
            message: "edited successfully",
            editedGenre: editedGenre,
        })
    } catch (err) {
        res.json({
            
            error: err,
        });
        
    }

};
exports.getGenreById = async( req , res)=>{
    const id = req.params.id;
    try {
       const selectedgenre =await Genre.findById(id);
       res.status(200).json({
           data: selectedgenre,
       });
    } catch (err) {
        res.status(400).json({
            
            error: err,
        })
    }
};

exports.deleteGenre = async(req , res)=>{
    const id = req.params.id;
    try {
        const deletegenre = await Genre.findByIdAndDelete(id);
        res.json({
            message : "delete successful",
            deletegenre : deletegenre,
        })
    } catch (err){
        res.json({
           error: err,
        });
    }
};
