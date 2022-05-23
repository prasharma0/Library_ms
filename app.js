require("dotenv").config({path:"./config/config.env"});
const express = require('express');
const morgan = require("morgan");
const connectDB = require('./config/db');
// const auth = require("./middlewares/auth"); //this middleware will be acting our defender for the route app.get("/protected");


const app = express();
//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());
//routes
  

   const booksRoutes = require("./routes/books");
   app.use("/api/books" , booksRoutes);

   const memberRoutes = require("./routes/member");
   app.use("/api/member", memberRoutes);

   const userRoutes = require("./routes/users")
   app.use("/api/users" , userRoutes);

   const genreRoutes = require("./routes/genre");
   app.use("/api/genre", genreRoutes);

   const historyRoutes = require("./routes/history");
   app.use("/api/history", historyRoutes);
   

  
//server configurations

const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
    try {
        await connectDB();
    console.log(`server listening on port: ${PORT}`)
    } catch (err) {
       console.log("error",err);
    }
    });