const History = require("../models/history");
const Book = require("../models/book");

exports.saveHistory = async( req , res)=>{ 

    const {book , member , type} = req.body;
    const bookId = String(book);
    try {
        
        const book = await Book.findById(bookId);
        if(type == "Borrow"){
            if(book.status = true){
                const history = new History ({ member , book , type});
                const savedHistory = await history.save();
                book.status = false;
                const savedBook = await book.save(); 

                res.json({
                    message: "History Saved !", 
                    history: savedHistory,
                    savedBook : savedBook, 
                });
            } else {
                res.json({
                    message : " Book already Borrowed !"
                });
            };
        } else {
            if(book.status = false){

                const history = new History({member, book , type});
                const savedHistory = await history.save();
                book.status = true;
                const savedBook = await book.save(); 

                res.json({
                    message: "History Saved !",
                    history: savedHistory,  
                    savedBook : savedBook,
                });
            } else {
                res.json({
                    message : " Book already returned !" 
                }); 
            };
            
        }
    } catch (err) {
        res.json({ 
            error: err,
        })
    }
};

exports.getAllHistories = async (req , res)=>{
    try {
        const allHistories = await History.find();
        res.status(200).json({
            data: allHistories,
        })
    } catch (err) {
        res.json({
            error: err,
        })
    }
};
exports.getSingleHistory = async(req ,res)=>{
    const id = req.params.id;
    try {
        
    const history = await History.findById(id);  
    res.status(200).json({ 
    data:history,
    
    })
    } catch (err) {
        res.json({
            error:err,
        })
    }
}