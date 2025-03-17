import dotenv from "dotenv"
import connectDB from "./DB/index.js";

dotenv.config({
    path: './env'
})


connectDB()







/*

import express from "express" ;

const app = express()


 ( async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
        app.on("error", () => {
            console.log("error:  server and app can't connect", error)
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR ", error );
        throw error 
    }
 }) ()
    */