import mongoose, { mongo }  from "mongoose";
import env from 'dotenv';
env.config();
const url = process.env.URL;

mongoose.connect(url);
const db = mongoose.connection;
db.on('open', ()=> {
    console.log("connected to the db");
});
db.once('error', ()=> {
    console.log("error in connecting to the db");
})
export {db};